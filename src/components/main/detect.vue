<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="bg"></div>
   <div class="top-nav">
       <el-menu
         mode="horizontal"
         background-color="#f2f2f2"
         text-color="#333"
         active-text-color="#409EFF"
         class="menu-bar"
       >
         <el-menu-item index="1">首页</el-menu-item>
         <el-menu-item index="2">用户信息</el-menu-item>
         <el-menu-item index="3">细胞识别</el-menu-item>
         <el-menu-item index="4">报表生成</el-menu-item>
       </el-menu>
       <div class="search-and-user">
         <el-dropdown>
           <span class="el-dropdown-link">
             用户名<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
           <el-dropdown-menu slot="dropdown">
             <el-dropdown-item>个人中心</el-dropdown-item>
             <el-dropdown-item>退出登录</el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>
       </div>
     </div>

  <div class="content">
    <div class="upload-img-container">
     <el-upload
            class="upload-demo"
            drag
            action="http://localhost:8080/api/detect/get"
            method="post"
            :on-success="handleSuccess"
            @error="handleError"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
    <section class="remind" >
      <span class="image-title">处理后的图片</span>
       <img :src="processedImage" v-if="processedImage" alt="Processed Image" />

       <button @click="downloadImage" class="download-button">下载图片</button>
       <button @click="downloadImage" class="download-button1">生成报表</button>
    </section>
     </div>
    </div>

      <div class="table-container" v-if="processedImage">

        <table >
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.classname">
              <td>{{ item.classname }}</td>
              <td>{{ item.number }}</td>
            </tr>
          </tbody>
        </table>
      </div>

  </div>

</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
export default {
  name: "login",
  data() {
    return {
      processedImage: null,
      tableData:[],
      role: 2,
      labelPosition: 'left',
      formLabelAlign: {
        username: '20154084',
        password: '123456'
      }
    }
  },
  methods: {
    //用户登录请求后台处理

    login() {
      console.log("登录操作执行-------");
      this.$axios({
        url: `http://localhost:8080/api/detect/get`,
        method: 'post',
        data: {

          ...this.formLabelAlign
        },
        headers: {'Content-Type': 'multipart/form-data' }
      }).then(res=>{
        console.log(res.data.data);
        let resData = res.data.data;
        let image = resData.image;
        console.log(resData.cs);
      })
    },
    clickTag(key) {
      this.role = key
    },
    adjustTableWidth() {
         const image = this.$el.querySelector('.remind img'); // 获取图片元素
         const tableContainer = this.$el.querySelector('.table-container'); // 获取表格容器元素
         if (image && tableContainer) {
           tableContainer.style.width = `${image.clientWidth}px`; // 设置表格容器宽度与图片一致
         }
       },
    handleSuccess(response, file, fileList) {
          console.log("Received response:", response);
            if (response.data && response.data.image) {
              this.processedImage = response.data.image;

              console.log("Processed image:", this.processedImage);
            } else {
              console.error('No image data found in response');
            }

         if (response.data && response.data.resultJson && response.data.resultJson.map) {
             const mapString = response.data.resultJson.map;
             // 去掉首尾的大括号并以逗号分割
             const entries = mapString.slice(1, -1).split(', ');
             entries.forEach(entry => {
               const [classname, number] = entry.split('=');
               let o = {
                 classname: classname.trim(),
                 number: parseInt(number.trim())
               };
               this.tableData.push(o);
             });
           } else {
             console.error('No map found in resultJson');
           }
           this.$nextTick(() => {
                   this.adjustTableWidth();
                 });
        },
    handleError(err, file, fileList) {
      console.error("Upload error:",err);
    },
    downloadImage() {
        const link = document.createElement('a');
        link.href = this.processedImage; // 链接到图片URL
        const date = new Date();
        const filename = `image_${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}.jpg`;
        link.download = filename; // 设置下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
  },
  computed: mapState(["userInfo"]),
  mounted() {
  this.adjustTableWidth();
  }
}
</script>


<style lang="less" scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  box-shadow: 0 2px 8px #f0f1f2;
  height: 40px;
}
.el-menu {
  line-height: 40px; /* 设置行高以垂直居中文本 */
}

.search-and-user {
  display: flex;
  align-items: center;
  gap: 20px;
}
.menu-bar {
  flex: 1;
  display: flex;
  align-items: center;
}

.remind {
  width: 100%; /* Full width of the content area */
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;}
.remind img{
    max-width: 80%; /* 调整图片的最大宽度 */
    max-height: 400px;
    height: auto;
    display: block;
    margin: 0 auto;
    object-fit: contain;
    color:#606266;
    background-color:#fff;
    margin-top:40px;
}

.image-title {
  position: absolute;
  top: 10px; /* Adjust according to your spacing needs */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 1;
}
.download-button {
  position: absolute;
  top: 0;
  right: -120px; /* 根据实际需求调整位置 */
  transform: translateY(-50%);
}

.download-button1 {
  position: absolute;
  top: 50%;
  right: 240px; /* 调整按钮位置以确保可见性 */
  transform: translateY(-50%);
  padding: 10px 20px;
  background-color: #409EFF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.container {
  margin-bottom: 32px;
}
.container .el-radio-group {
  margin: 30px 0px;
}
a:link {
  color:#ff962a;
  text-decoration:none;
}

.content {
   display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
}

.upload-img-container {
  display: flex;
  align-items: center;
   flex-direction: column;
  justify-content: space-around;
  width: 90%;
  margin: 0 auto;
}

.upload-demo, .remind {
  flex: 1;  /* 两者平分空间 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-demo {
  margin-right: 20px; /* 添加一些间隔 */
  margin-top: 20px;
}
.download-button {
  position: absolute;
  top: 50%;
  right: 340px; /* 调整按钮位置以确保可见性 */
  transform: translateY(-50%);
  padding: 10px 20px;
  background-color: #409EFF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.table-container {
  width: 100%;
  margin-top: 20px; /* Space from the above section */
  display: flex;
  justify-content: center;

}

table {
  width: 100%;
  border-collapse: collapse; /* 为表格添加合并边框的效果 */
  margin-top: 10px;
}

th, td {
  padding: 8px 16px; /* 设置单元格内边距 */
  text-align: left; /* 文本对齐方式 */
  border-bottom: 1px solid #e8e8e8; /* 为每行添加底部边界 */
}

thead th {
  background-color: #f0f0f0; /* 表头背景颜色 */
  color: #333; /* 表头文字颜色 */
}


#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;


}
#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: #ff962a;
  display: flex;
  justify-content: center;
}
#login .top .icon-kaoshi {
  font-size: 80px;
}
#login .top .title {
  margin-top: 20px;
}
#login .bottom {
  display:flex;
  justify-content: center;
  background-color:#fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#login .bottom .title {
  text-align: center;
  font-size: 30px;
}
.bottom .container .title {
  margin: 30px 0px;;
}
.bottom .submit .row-login {
  width: 100%;
  background-color: #04468b;
  border-color: #04468b;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}
.bottom .submit {
  display: flex;
  justify-content: center;
}
.footer {
  margin-top: 50px;
  text-align: center;
}
.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}
.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}
.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}
.bottom .options > a {
  color: #ff962a;
}
.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
</style>



