<template>
    <div>
        <el-row :gutter="20" style="margin-top:10px;">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>个人中心</span>
                        </div>
                        <div>
                            <div class="demo-basic--circle">
                            
                        </div>
                        <div class="name-role">
                            <div class="block">
                                <el-avatar :size="50" :src="state.circleUrl" />
                            </div>
                            <span class="sender">{{ dataForm.role == 0 ? "管理员" : dataForm.role == 1 ? "医生" : dataForm.role == 2 ?  "患者" : "" }} - {{ dataForm.username }}</span>
                        </div>
                        <div class="registe-info">
                            <span class="registe-info">
                                注册时间：
                                <li class="fa fa-clock-o"></li>
                                {{ dataForm.createAt }}
                            </span>
                        </div>
                        </div>
                        <el-divider></el-divider>
                        <div class="personal-relation">
                            <div class="relation-item">姓名: <div style="float: right; padding-right:20px;">
                                    {{ dataForm.name }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">手机号: <div style="float: right; padding-right:20px;">
                                    {{ dataForm.phone }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">邮箱: <div style="float: right; padding-right:20px;">
                                    {{ dataForm.email }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">性别: <div style="float: right; padding-right:20px;">
                                    {{ dataForm.sex }}</div>
                            </div>
                        </div>
                        <div class="personal-relation">
                            <div class="relation-item">年龄: <div style="float: right; padding-right:20px;">
                                    {{ dataForm.age }}</div>
                            </div>
                        </div>
                        
                    </el-card>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" >
                            <span>基本资料</span>
                        </div>
                        <div style="margin-top: 20px;">
                            <el-form label-width="80px" v-model="dataFrom" size="small" label-position="right">
                                <el-form-item label="用户昵称" prop="username">
                                    <el-input auto-complete="off" v-model="dataForm.username"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名" prop="name">
                                    <el-input auto-complete="off" v-model="dataForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="phone">
                                    <el-input auto-complete="off" v-model="dataForm.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="username">
                                    <el-input auto-complete="off" v-model="dataForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="username">
                                    <el-input auto-complete="off" v-model="dataForm.sex"></el-input>
                                </el-form-item>
                                
                                <el-form-item label="年龄" prop="homeUrl">
                                    <el-input maxlength="18" v-model="dataForm.age"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button size="mini" type="primary" style="margin-left: -50px;" @click="updateUser(dataForm)">提交</el-button>
                                <el-button size="mini" type="warning" style="margin-left: 30px;" @click="gotoPage('/profile')">关闭</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script setup>

import { ref, onBeforeMount, reactive, onMounted } from 'vue'
import { getUserByToken } from "../../http/api"
import { useRouter } from 'vue-router'
import { update } from "@/http/api.js"




const router = useRouter()
const dataForm = ref({
    
})
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

onMounted(() => {
    const token = localStorage.getItem('token')
    getUserByToken(token).then(u => {
        dataForm.value = u;
        console.log(dataForm.value.name);
    }).catch(res => {
        console.log("异常处理:" + res.message);
		alert(res.message)
    });
});


const updateUser = (dataForm) => {
    console.log(dataForm);
    update(dataForm).then(res  => {
        dataForm = res.user
    })
    .catch(res => {
        console.log("异常处理:" + res.message);
		alert(res.message)
    })
}

const gotoPage = (root) => {
    location.reload();
}

</script>









<style lang="scss" scoped>
//卡片样式
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 100%;
}

//文本样式区
.name-role {
    font-size: 16px;
    padding: 5px;
    text-align: center;
}

.sender {
    text-align: center;
}

.registe-info {
    text-align: center;
    padding-top: 10px;
}

.personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
    width: 100%
}

.relation-item {
    padding: 12px;

}

.dialog-footer {
    padding-top: 10px;
    padding-left: 10%;
}

//布局样式区
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}


.el-form-item {
    margin-top: 20px;
    margin-bottom: 20px
}
</style>
