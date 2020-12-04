<template>
  <div class="list-big-box">
    <div class="form-box">
      <el-form ref="form" :model="form" class="form">
        <el-input
          v-model="form.title"
          class="form-name"
          placeholder="请输入标题"
        ></el-input>
        <el-select v-model="form.type" placeholder="请选择" class="form-type">
          <el-option value="-1" label='请选择'></el-option>
          <el-option
            v-for="item in options2"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-checkbox
          label="推荐"
          name="type"
          v-model="form.recommend"
        ></el-checkbox>

        <el-button type="primary" @click="onSubmit" class="findbtn"
          >搜索</el-button
        >
        <el-button type="primary" @click="emty" class="findbtn">清空</el-button>
      </el-form>
    </div>
    <el-table :data="tableData" class="blog-table-content">
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column label="标题">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类别">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.type | typeChange(that) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="推荐">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.recommend | remChange }}</span>
        </template>
      </el-table-column>

      <el-table-column label="浏览次数">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.views }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布/保存">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.published | formPublished }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新日期">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.update_time | formDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250px" stripe="true" align="center">
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
          <el-button
            type="success"
            size="mini"
            @click="publish(scope.$index, scope.row)"
          >
            发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-button size="small" @click="pre">上一页</el-button>
      <el-button size="small" @click="next">下一页</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.list-big-box {
  width: 100%;
  height: auto;
}
.form-box {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  margin-top: 20px;
  border: 1px solid rgb(194, 191, 191);
  border-radius: 5px;
  height: 100px;
}
.form {
  display: flex;
  align-items: center;
  padding: 0 50px;
  height: 100%;
  justify-content: space-around;
}
.form-name {
  width: 200px;
  margin-right: 20px;
}

.blog-table-content {
  width: 90%;
  margin: 40px auto;
  margin-bottom: 0px;
  border: 1px solid rgb(194, 191, 191);
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.page {
  background-color: white;
  width: 90%;
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
      form: {
        title:'',
        recommend:false,
        type:"-1",
      },
      change: false,
      tableData: [], //表格数据
      pageIndex: 1, //页数,默认第一页
      allType: [], //全部的类型
      that: this,
      options2: [], //选择分类
    };
  },
  filters: {
    typeChange(id, that) {
      if (id) {
        for (let key of that.allType) {
          if (id == key.id) {
            return key.name;
          }
        }
      }
      return "无";
    },
    remChange(rem) {
      if (rem == 1) {
        return "是";
      } else {
        return "否";
      }
    },
    formDate(data) {
      if (data) {
        return data.split("T")[0];
      } else {
        return "无";
      }
    },
    formPublished(status) {
      return status == 1 ? "保存" : "发布";
    },
  },
  methods: {
    emty() {
      this.form = {};
      this.getAll(1);
    },
    // 发布
    publish(index, row) {
      this.$axios.post(api.blog.publish, { id: row.id }).then((data) => {
        if (data.code == 200) {
          alert("发布成功");
          this.getAll(1)
        } else {
          alert("发布失败");
        }
      });
    },
    // 查
    onSubmit() {
      if (this.form.recommend) {
        this.form.recommend = 1;
      }

      this.form.recommend = "none";

      if (!this.form.title) this.form.title = "none";

      if (!this.form.type) this.form.type = "none";
      if (
        this.form.title == "none" &&
        this.form.recommend == "none" &&
        this.form.type == "none"
      ) {
        alert("不可为空哦！");
        return;
      }
      this.getSelect(this.form);
    },
    // 修
    handleEdit(index, row) {
      this.change = true;
      let obj = {
        row: row,
        changeFlag: this.change,
      };
      this.$router.push({path:"/blogsub",query:obj});
      this.change = false;
    },
    // 删
    handleDelete(index, row) {
      this.removeBlog(row.id);
    },
    // 删api
    removeBlog(id) {
      this.$axios.post(api.blog.remove, { id: id }).then((data) => {
        if (data.code == 200) {
          alert("成功");
          this.getAll(1);
        }
      });
    },
    // 查api
    getSelect() {
      this.$axios.post(api.blog.select, this.form).then((data) => {
        console.log(data);
        this.tableData = data;
      });
    },

    // 博客数据api
    getAll(pageIndex) {
      this.$axios.post(api.blog.get, { pageIndex: pageIndex }).then((data) => {
        this.tableData = data.data;
        this.pageTotal = data.pageTotal;
      });
    },
    // type类型api
    async getType() {
      await this.$axios.post(api.type.get, { all: 1 }).then((data) => {
        this.allType = data;
      });
      for (let i = 0; i < this.allType.length; i++) {
        let obj = {};
        obj.value = this.allType[i].id;
        obj.index = i;
        obj.label = this.allType[i].name;
        this.options2.push(obj);
      }
    },
    // 上一页
    pre() {
      if (this.pageIndex > 1) {
        this.pageIndex -= 1;
        this.getAll(this.pageIndex);
      }
    },

    // 下一页
    next() {
      if (this.pageIndex < this.pageTotal) {
        this.pageIndex += 1;
        this.getAll(this.pageIndex);
      }
    },
  },
  created() {
    this.getAll(1);
    this.getType();
  },

};
</script>