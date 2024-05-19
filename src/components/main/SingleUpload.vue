<template>
  <div class="upload-container">
    <div class="upload-wrapper">
      <el-upload
        class="upload-box"
        action="http://localhost:8080/api/img/fileUpload"
        accept="image/*"
        :drag="true"
        :multiple="true"
        :show-file-list="true"
        list-type="picture"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-success="handleUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传 jpg/png 文件</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleUpload',
  props: {
    value: String
  },
  data() {
    return {
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        OSSAccessKeyId: '',
        dir: '',
        host: ''
      },
      fileList: [],
      response: {
        fileName: '',
        filePath: '',
        time: ''
      },
    }
  },
  methods: {
    beforeUpload(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$message({
          message: '只能上传 jpg/png 文件',
          type: 'error',
          center: true
        });
        return false;
      }
      let url = URL.createObjectURL(file)
      localStorage.setItem(file.name,url)
      // console.log('file',localStorage.getItem(file.name));
    },
    handleUploadSuccess(res) {
      this.response = res;
      this.$message({
        message: '文件上传成功',
        type: 'success',
        center: true
      });
      // console.log(this.response);
      this.emitInput(this.response.fileName, this.response.filePath, this.response.time,this.response.file);
    },
    emitInput(name, url, time,file) {
      this.$emit('input', name, url, time,file);
    },
  }
}
</script>

<style>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  padding: 20px;
  box-sizing: border-box;
}

.upload-wrapper {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
}

.upload-box {
  border: 2px dashed #d9d9d9;
  border-radius: 10px;
  padding: 40px;
  background-color: #fff;
  text-align: center;
  transition: border-color 0.3s, background-color 0.3s;
}

.upload-box:hover {
  border-color: #409eff;
  background-color: #f9f9f9;
}

.el-upload__text {
  font-size: 18px;
  color: #606266;
  margin-top: 10px;
}

.el-upload__text em {
  color: #409eff;
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

.el-message {
  font-size: 16px;
}
</style>
