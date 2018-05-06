<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAuthorsFromServer">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="authors" highlight-current-row @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
            <el-table-column prop="_id" label="ID" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="company" label="单位" width="250" sortable>
			</el-table-column>
			<el-table-column prop= "titles" label="职务头衔" width="200" :formatter="formatTitles" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="editForm.img" ></el-input>
                </el-form-item>
				<el-form-item label="单位">
					<el-input v-model="editForm.company" ></el-input>
				</el-form-item>
				<el-form-item label="职务头衔">
                    <el-input v-model="editForm.titles" ></el-input>
                </el-form-item>
				<el-form-item label="介绍">
					<el-input type="textarea" v-model="editForm.introduction"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			 <el-button @click.native="dialogFormVisible=false">取消</el-button>
			  <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import {
  getAuthors,
  getAuthor,
  createAuthor,
  editAuthor,
  deleteAuthor,
  removeUser,
  batchRemoveUser,
  editUser
} from "../../api/api";

export default {
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      authors: [],
      total: 0,
      page: 1,
     // listLoading: false,v-loading="listLoading"
      sels: [], //列表选中列

      //editFormVisible: false, //编辑界面是否显示
      //editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "",
        img: "",
        company:"",
        titles:[],
        introduction:""
      },

      addFormVisible: false, //新增界面是否显示
      //addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      }
    };
  },
  methods: {
    //title 转换
    formatTitles: function(row, column) {
        console.log("titles:"+row.titles);
        if(Array.isArray(row.titles)){
            return row.titles.join(" ");
        }else{
            return row.titles;
        }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getAuthorsFromServer();
    },
    //获取用户列表
    getAuthorsFromServer() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      //this.listLoading = true;
      //NProgress.start();
      getAuthors(para).then(res => {
          console.log(res.data);
        this.total = res.data.total;
        this.authors = res.data.authors;
        //this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          //this.listLoading = true;
          //NProgress.start();
          let para = { _id: row._id };
          deleteAuthor(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAuthorsFromServer();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      //this.editFormVisible = true;
      console.log(row);
      var rowData = Object.assign({}, row);
      rowData.titles = rowData.titles.join(" ");
      this.editForm = Object.assign({}, rowData);
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create";
      //this.addFormVisible = true;
      this.dialogFormVisible = true;
      this.editForm = {
        name: "",
        img: "",
        company:"",
        titles:"",
        introduction:""
		}
    },
    //编辑
    updateData:function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              //this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.titles = para.titles.split(/\s+/);
              editAuthor(para).then(res => {
                //this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                //this.editFormVisible = false;
                 this.dialogFormVisible = false;
                this.getAuthorsFromServer();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //新增
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
              //this.editLoading = true;
              //NProgress.start();
              this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
              let para = Object.assign({}, this.editForm);
              console.log(para);
              para.titles = para.titles.split(/\s+/);
              createAuthor(para).then(res => {
                //this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                //this.addFormVisible = false;
                this.getAuthorsFromServer();
              });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },
    //全选单选多选
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
         // this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getAuthorsFromServer();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getAuthorsFromServer();
  }
};
</script>

<style>
textarea{
    height:150px;
}
</style>