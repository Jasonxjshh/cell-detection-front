<template>
  <div>
    <!--状态2-->
    <div v-if="pageStatus === 2">
      <el-card class="inquiry-card">
        <p class="title">脑脊液细胞检测系统</p>
        <el-divider></el-divider>
        <SingleUpload @input="uploadSuccess" class="single-upload"></SingleUpload>
        <el-divider></el-divider>
        <div  class="description-wrapper">
          <el-descriptions v-for="item in addForm" :key="item.file_name" :column="4" size="medium" border class="description">
            <el-descriptions-item :span="1">
              <template slot="label">
                <i class="el-icon-files"></i>
                文件名
              </template>
              <div class="name">
                {{ item.file_name }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label">
                <i class="el-icon-time"></i>
                上传时间
              </template>
              {{ item.upload_time }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label">
                <i class="el-icon-warning-outline"></i>
                文件类型
              </template>
              {{ item.file_type }}
            </el-descriptions-item>
            <el-descriptions-item :span="1">
              <template slot="label">
                <i class="el-icon-setting"></i>
                操作
              </template>
              <el-button type="primary" size="mini" round class="btn-default" v-if="item.file_type === 'jpg' || item.file_type === 'png'" @click="openDialog(item)">
                预览
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
        </div>
        <!-- <el-dialog :visible.sync="dialogVisible" width="50%">
          <img :src="previewUrl" width="100%" alt="预览图片" />
        </el-dialog> -->
        <el-dialog v-model="dialogVisible" width="60%" title="脑脊液细胞检测系统">
          <img :src="previewUrl" width="100%" alt="预览图片" />
          
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import SingleUpload from './SingleUpload'

export default {
  name: "InquiryFive",
  components: {
    SingleUpload,
  },
  data() {
    return {
      pageStatus: 2,
      addForm: [],
      dialogVisible: false,
      previewUrl: '',
    }
  },
  created(){
    console.log('addForm',this.addForm);
  },
  methods: {
    uploadSuccess(name, url, time,file) {
      let item = {
        file:file,
        file_name: name,
        file_type: name.split(".")[1],
        upload_time: time,
        url: url // 保存文件的URL
      };
      this.addForm.push(item);
    },
    openDialog(item) {
      let url = localStorage.getItem(item.file)
      console.log('item',url);
      if (url) {
        this.previewUrl = url;
      }
      this.dialogVisible = true;
      // console.log('item',this.previewUrl,this.dialogVisible);
    },
  }
}
</script>

<style scoped>
.inquiry-card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
::v-deep .upload-container{
  width: 100%;
  background-image: url('../assets/bj.png') !important;
  background-size: 100% 100% !important;
}
.name{
  width: 360px !important;
  overflow: hidden; /* 确保超出容器的文本被隐藏 */
  white-space: nowrap; /* 防止文本换行 */
  text-overflow: ellipsis; /* 用省略号表示被截断的文本 */
}
.title{
  background: linear-gradient(to right, #ff0000,#ffa600, #ffff00);/* 可以添加多种颜色你自己去改成想要的颜色 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.title {
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
}

.single-upload {
  margin: 20px auto;
  text-align: center;
}

.description-wrapper {
  margin-top: 20px;
  padding: 10px;
}

.description {
  margin-top: 0;
}

.el-descriptions-item {
  text-align: left;
  font-size: 14px;
}

.el-descriptions-item i {
  margin-right: 5px;
}

.el-upload-list {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.el-upload__text {
  font-size: 16px;
  color: #606266;
}

.el-upload__tip {
  font-size: 14px;
  color: #909399;
  margin-top: 10px;
}

.el-icon-upload {
  font-size: 50px;
  color: #409eff;
}

.el-button {
  background-color: #409eff;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #66b1ff;
}

.el-divider {
  margin: 20px 0;
}
</style>
