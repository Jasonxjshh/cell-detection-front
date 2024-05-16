<!--头部导航栏-->
<template>
    <div class="topNavigation">
        <div class="headerMenu">细胞检测系统</div>
        <div style="flex: 1"></div>
        <div style="width: 450px; margin: 10px; text-align: right;">
            <el-avatar class="ml-2" :size="30" :src="imgurl" />
            <el-dropdown>
                <el-button style="border: white; ">{{ user.name }}<el-icon><arrow-down /></el-icon></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人信息</el-dropdown-item>
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


const tokenStore = useTokenStore()
const roleStore = useRoleStore()
const router = useRouter()
const user = ref({});
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