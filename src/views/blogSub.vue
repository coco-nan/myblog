<template>
  <div class="blogSub-box">
    <el-form :model="form" ref="form">
      <!-- 原创标签 -->
      <div class="find-header">
        <el-select
          v-model="form.flag"
          placeholder="请选择"
          class="form-tag-top"
        >
          <el-option
            v-for="item in options1"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </div>
      <!-- 文本编写 -->
      <div class="text-area">
        <div id="test-editor">
          <mavon-editor
            v-model="form.content"
            ref="md"
            @imgAdd="$imgAdd"
            @change="change"
            style="min-height: 600px"
          />
        </div>
      </div>
      <!-- 首图描述 -->
      <el-lable>
      描述：
      <el-input type="textarea" v-model="form.descti" resize="none"></el-input>
      </el-lable>
      <!-- 标签选择 -->
      <div class="tag-area">
        <div class="tag-area-top">
          <!-- 分类 -->
          <div class="sort-box">
            <label>分类</label>
            <el-select
              v-model="form.type"
              placeholder="请选择"
              class="form-tag-top"
            >
              <el-option
                v-for="item in options2"
                :key="item.index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 标签2 -->
          <div class="tag2-box">
            <label>标签</label>
            <el-select v-model="form.tag" multiple placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 推荐选择 -->
          <div class="rem-area">
            <el-checkbox v-model="recommend">推荐</el-checkbox>
            <el-checkbox v-model="shareStatement">转载声明</el-checkbox>
            <el-checkbox v-model="appreciation">赞赏</el-checkbox>
            <el-checkbox v-model="commentabled">评论</el-checkbox>
          </div>
        </div>

        <!-- 图片地址 -->
        <div class="img-area">
          <label class="label-img"> 首图</label>
          <el-input
            v-model="form.first_pic"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>

      <div class="btn-area">
        <el-button type="info" @click="back"> 返回 </el-button>
        <el-button type="primary" @click="submit"> 保存 </el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.img-area {
  display: flex;
}
.blogSub-box {
  padding: 20px;
}
.find-header {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  margin-top: 20px;
}
.tag-area {
  display: flex;
  margin-top: 20px;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 5px;
  flex-direction: column;
  padding: 10px 15px;
}
.tag-area-top {
  display: flex;
  margin-bottom: 10px;
}
.sort-box,
.tag2-box {
  display: flex;
  margin-right: 20px;
}
.form-tag-top {
  width: 100px;
}

.tag-area-top label {
  line-height: 40px;
  font-size: 14px;
  padding: 0 5px;
}
.btn-area {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.text-area{
  margin-bottom:40px;
}
</style>

<script>
import api from "../utils/base.js";

export default {
  data() {
    return {
      content: "", // 输入的markdown
      html: "", // 及时转的html
      form: {
        title:'',content:'',flag:'',type:'',first_pic:'',descti:'',tag:[]
      }, //需要提交的表单
      options1: [
        {
          value: "原创",
          label: "原创",
          index: 1,
        },
        {
          value: "转载",
          label: "转载",
          index: 2,
        },
        {
          value: "广告",
          label: "广告",
          index: 3,
        },
      ],
      recommend: false,
      shareStatement: false,
      appreciation: false,
      commentabled: false,
      options2: [],
      options3: [],
    };
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      let formdata = new FormData();

      this.$upload
        .post("/上传接口地址", formdata)
        .then((res) => {
          console.log(res.data);
          this.$refs.md.$img2Url(pos, res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.form.html = render;
    },
    // 保存
    submit() {
      // 修改推荐 1:开启 2关
      if (this.recommend == true) {
        this.form.recommend = 1;
      } else {
        this.form.recommend = 2;
      }
      //  修改可分享
      if (this.shareStatement == true) {
        this.form.shareStatement = 1;
      } else {
        this.form.shareStatement = 2;
      }

      //  修改可赞赏
      if (this.appreciation == true) {
        this.form.appreciation = 1;
      } else {
        this.form.appreciation = 2;
      }

      //  修改可评论
      if (this.commentabled == true) {
        this.form.commentabled = 1;
      } else {
        this.form.commentabled = 2;
      }

      this.form.published = 1;

      this.addBlog();
    },
    // 返回
    back() {
      this.$router.push("/bloglist");
    },

    // 获取分类
    getType() {
      this.$axios.post(api.type.get, { all: 1 }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.value = data[i].id;
          obj.index = i;
          obj.label = data[i].name;
          this.options2.push(obj);
        }
      });
    },
    // 获取标签
    getTag() {
      this.$axios.post(api.tag.get, { all: 1 }).then((data) => {
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          obj.value = data[i].id;
          obj.index = i;
          obj.label = data[i].name;
          this.options3.push(obj);
        }
      });
    },
    //添加
    addBlog() {
      // 修改数据
      if(this.changeFlag){
        this.$axios.post(api.blog.update,this.form).then((data) =>{
          if(data.code == 200){
            alert('修改成功');
             this.$router.push("/bloglist");
          }
        })
        return
      }
      // 添加数据
      this.$axios.post(api.blog.add, this.form).then((data) => {
        if (data.code == 200) {
          alert("添加成功");
          this.$router.push("/bloglist");
        }
      });
    },
    
    


    getSingle() {
      this.$axios.post(api.blog.signle, { id: 6 }).then((data) => {
        console.log(data);
      });
    },
    
    // 过滤数据
    formData(data) {
      if (data == 1) {
        return true;
      }
      return false;
    },
  },

  created() {
    // 获取分类
    this.getType();
    this.getTag();
    let arr = Object.keys(this.$route.query);
    // 转换数据form数据格式
    if (arr.length != 0) {
      let oldForm = this.$route.query.row;
      this.changeFlag = this.$route.query.changeFlag;
      this.form.title = oldForm.title;
      this.form.flag = oldForm.flag;
      this.form.content = oldForm.content;
      this.form.type = oldForm.type;
      this.form.first_pic = oldForm.first_pic;
      this.form.descti = oldForm.descti;
      this.recommend = this.formData(oldForm.recommend);
      this.commentabled = this.formData(oldForm.commentabled);
      this.shareStatement = this.formData(oldForm.shareStatement);
      this.appreciation = this.formData(oldForm.appreciation);
      this.form.id = oldForm.id;
      this.$axios.post(api.blog.tagId,{blog_id:this.form.id}).then(data =>{
        this.form.tag = data.data;
      })
      
      
    }
  }
};
</script>