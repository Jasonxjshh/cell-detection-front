<!--头部导航栏-->
<template>
    <div class="topNavigation">
            <div class="headerMenu" @click="gotoHome">细胞检测系统</div>
        <div style="flex: 1"></div>
        <div style="width: 450px; margin: 10px; text-align: right;">
            <el-avatar class="ml-2" :size="30" :src="imgurl" />
            <el-dropdown>
                <el-button style="border: white; ">{{ user.name }}<el-icon><arrow-down /></el-icon></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="gotoPage('/profile')">个人信息</el-dropdown-item>
                        <el-dropdown-item >修改密码</el-dropdown-item>
                        <el-dropdown-item @click="quit">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>


<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, onBeforeMount, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserByToken } from "../../http/api"
import { useRoleStore, useTokenStore } from '../../stores/user.js'
import Profile from '../main/profile.vue'


const tokenStore = useTokenStore()
const roleStore = useRoleStore()
const router = useRouter()
const user = ref({});
const imgurl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
onMounted(() => {
    const token = localStorage.getItem('token')
    getUserByToken(token).then(u => {
        user.value = u;

    }).catch(res => {
        console.log("异常处理:" + res.message);
		alert(res.message)
        router.push({ name: 'login' })
    });
});


const quit = () => {
    tokenStore.clearTokenAuth();
    roleStore.clearRoleAuth();
    router.push({ name: 'login' })
};

const gotoPage = (root) => {
    router.push(root)
}

const gotoHome = () => {
    console.log(user.value.role);
    if(user.value.role == 0){
			router.push({ name: 'adminHome' })
		}else{
			router.push({ name: 'home' })
		}
}
</script>

<style>
.topNavigation {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f6eaff;
    display: flex;
}

.headerMenu {
    width: 200px;
    padding-left: 30px;
    font-weight: bold;
    color: dodgerblue;
}
</style>