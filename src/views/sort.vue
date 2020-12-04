<template>
  <div class="list-big-box">
    <!-- 表格 -->

    <el-table
      :data="tableData"
      class="blog-table-content"
      highlight-current-row
    >
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column label="类型名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-button size="small" @click="pre()">上一页</el-button>
      <el-button size="small" type="" @click="dialogVisible = true"
        >添加</el-button
      >
      <el-button size="small" @click="next()">下一页</el-button>
    </div>

    <!-- 添加的窗口 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="sub_type_name" placeholder="请输入类名"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑的窗口 -->
    <el-dialog
      title="修改分类"
      :visible.sync="dialog2Visible"
      width="30%"
      :before-close="handleClose2"
    >
      <el-input v-model="update_name" placeholder="请输入类名"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2Visible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.blog-table-content {
  width: 80%;
  margin: 40px auto;
  margin-bottom: 0px;
  border: 1px solid rgb(194, 191, 191);
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.page {
  background-color: white;
  width: 80%;
  border: 1px solid rgb(194, 191, 191);
  border-top: 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  height: 50px;
  align-items: center;
  box-sizing: border-box;
}
</style>


<script>
import api from "../utils/base.js";

export default {
  data() {
    return {
      dialogVisible: false, //添加弹窗
      dialog2Visible: false, //修改的弹窗
      tableData: [],
      pageIndex: 1,
      pageTotal: 0,
      sub_type_name: "", //添加的表单
      update_name: "", //修改的表单
      id: "", //修改的表单id
    };
  },
  methods: {

    // 打开编辑窗口
    handleEdit(index, row) {
      this.dialog2Visible = true;
      this.update_name = row.name;
      this.id = row.id;
    },
    
    // 删除框
    handleDelete(index, row) {
      console.log(index, row);
      alert("确定删除？")
      this.$axios.post(api.type.remove,{
        id:row.id
      }).then(data =>{
        if(data.code == 200){
          alert('删除成功')
          this.getData()
        }
      })
    },

    //  添加的弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 修改的弹窗关闭
    handleClose2(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    //修改表单
    update() {
      this.$axios
        .post(api.type.update, {
          name: this.update_name,
          id: this.id,
        })
        .then((data) => {
          console.log(data);
          alert("修改成功");
          this.dialog2Visible = false;
          this.getData();
        });
    },

    // 获取上一页
    pre() {
      if (this.pageIndex > 1) {
        this.pageIndex -= 1;
        this.$axios
          .post(api.type.get, { pageIndex: this.pageIndex })
          .then((data) => {
            this.tableData = data.data;
          });
      }
      return;
    },

    // 获取下一页
    next() {
      if (this.pageIndex < this.pageTotal) {
        this.pageIndex += 1;
        this.$axios
          .post(api.type.get, { pageIndex: this.pageIndex })
          .then((data) => {
            this.tableData = data.data;
          });
      }
    },

    // 添加分类
    add() {
      this.$axios
        .post(api.type.add, { name: this.sub_type_name })
        .then((data) => {
          if (data.code == 200) {
            alert("添加成功");
            this.dialogVisible = false;
          }else{
            this.dialogVisible = false;
            alert('数据不可重复，请检查！')
          }
        })

        ;
    },
    // 获取数据
    getData() {
      this.$axios.post(api.type.get, { pageIndex: 1 }).then((data) => {
        this.tableData = data.data;
        this.pageTotal = data.pageTotal;
      });
    }

  },

  beforeCreate() {
    // 首页首次渲染
    this.$axios.post(api.type.get, { pageIndex: 1 }).then((data) => {
        this.tableData = data.data;
        this.pageTotal = data.pageTotal;
      });
  },
};
</script>