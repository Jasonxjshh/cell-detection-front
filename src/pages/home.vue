<template>
    <div>
        <el-config-provider>
            <!--    头部-->
            <Header/>
            <!--    主体-->
            <div style="display: flex">
                <!--          侧边栏-->
                <Sidebar :role='userRole'/>
                <!--          主体内容区域-->
                
                <router-view style="flex: 1"/>
                
            </div>
        </el-config-provider>
    </div>
</template>

<script setup>
import Header from '@/components/header/header.vue';
import Sidebar from '@/components/sidebar/sidebar.vue';
import { useRoleStore, useTokenStore } from '../stores/user.js'


const roleStore = useRoleStore()


const userRole =  String(roleStore.role)
</script>