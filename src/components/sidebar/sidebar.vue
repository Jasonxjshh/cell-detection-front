<!--左侧边栏-->
<template>
    <nav>
        <el-row class="tac">
            <!--            加入outer实现导航栏点击跳转,index项值为对应的路由-->
            <el-menu router style="width: 200px ; min-height: 90vh" active-text-color="#ffd04b"
                class="el-menu-vertical-demo" default-active="user" text-color="black" :default-openeds="['admin']">
                <el-sub-menu v-if="role === '0'" index="admin">
                    <template #title>
                        <el-icon>
                            <user />
                        </el-icon>
                        <span>系统管理</span>
                    </template>
                    <el-menu-item index="doctor_management">医生管理</el-menu-item>
                    <el-menu-item index="patient_management">患者管理</el-menu-item>
                </el-sub-menu>
                    <!-- 医生菜单 -->
                    <el-sub-menu v-if="role === '1'" index="doctor">
                        <template #title>
                            <el-icon>
                                <user />
                            </el-icon>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item index="patient_management">患者管理</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu v-if="role === '1'" index="cell">
                        <template #title>
                            <el-icon>
                                <grid />
                            </el-icon>
                            <span>细胞检测</span>
                        </template>
                        <el-menu-item index="upload_image">上传图片</el-menu-item>
                        <el-menu-item index="result_management">结果管理</el-menu-item>
                    </el-sub-menu>

                    <!-- 患者菜单 -->
                    <el-sub-menu v-if="role === '2'" index="patient">
                        <template #title>
                            <el-icon>
                                <user />
                            </el-icon>
                            <span>就医管理</span>
                        </template>
                        <el-menu-item index="info">基本信息</el-menu-item>
                        <el-menu-item index="cell_result">细胞结果</el-menu-item>
                    </el-sub-menu>

                    <!-- 公共菜单 -->
                     <el-menu-item  index="profile">
                        <template #title>
                            <el-icon>
                                <house />
                            </el-icon>
                            <span>个人中心</span>
                        </template>

                    </el-menu-item>
                     <el-menu-item  index="uploadMessage">
                        <template #title>
                            <el-icon>
                                <house />
                            </el-icon>
                            <span>图片上传</span>
                        </template>

                    </el-menu-item>

                     <!-- <el-menu-item  index="InquiryFive">
                        <template #title>
                            <el-icon>
                                <house />
                            </el-icon>
                            <span>图片上传</span>
                        </template>

                    </el-menu-item> -->


                    <el-menu-item  index="uploadMessage">
                        <template #title>
                            <el-icon>
                                <house />
                            </el-icon>
                            <span>图片上传and检测</span>
                        </template>

                    </el-menu-item>

            
            </el-menu>
        </el-row>
    </nav>
</template>
<script setup>
import { Location, Grid, Document, Setting, User, House } from '@element-plus/icons-vue'
import { defineProps } from 'vue'

// 接收来自父组件传递的用户角色
const props = defineProps({
  role: String
});

</script>

<style scoped></style>