<template>
	<div class="login-wrap">
		<el-form :model="form" class="login-container">
			<h1 class="title">细胞检测系统登录</h1>
			<el-form-item label="">
				<el-input :prefix-icon="User" type="text" v-model="form.username" placeholder="登录账号"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-input :prefix-icon="Lock" type="password" v-model="form.password" placeholder="登录密码"
					show-password></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-select v-model="form.role" placeholder="请选择身份" clearable>
					<el-option label="管理员" value="0" key="管理员" />
					<el-option label="医生" value="1" key="医生" />
					<el-option label="患者" value="2" key="患者" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="width:100%;" @click="doSubmit()">提交</el-button>
			</el-form-item>
			<el-row style="text-align: center;margin-top:-10px">
				<el-link type="primary" style="margin-right: auto;">忘记密码</el-link>
				<el-link type="primary" @click="goToRegister()">用户注册</el-link>
			</el-row>
		</el-form>
	</div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { login, getUserByToken } from "../http/api.js"
import { useRouter } from 'vue-router'
import bcrypt from 'bcryptjs'
import { useRoleStore, useTokenStore } from '../stores/user.js'

const router = useRouter()

const form = reactive({
	username: "",
	password: "",
	role: ""
})
const tokenStore = useTokenStore()
const roleStore = useRoleStore()
const doSubmit = async () => {
	try {
		console.log(form);
		const res = await login(form);
		console.log(res);
		/* 登录正常 */
		const token = res.token;
		const role = res.role;
		console.log(token);
		console.log(role);
		tokenStore.setToken(token);
		roleStore.setRole(role);
		if (role == 0) {
			router.push({ name: 'adminHome' });
		} else {
			router.push({ name: 'home' });
		}
	} catch (error) {
		console.log("异常处理:" + error.message);
		alert(error.message);
	}
};

const goToRegister = () => {
	router.push({name: 'register'})
		localStorage.setItem("role_2_user_name" , res.name ) ; 
		localStorage.setItem("role_2_user_id" , res.id ) ; 
		router.push({ name: 'home' })
		
}

</script>


<style scoped>
.login-wrap {
	background-image: url(/src/assets/background.jpg);
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding-top: 10%;
	padding-bottom: 100%;

	background-repeat: no-repeat;
	background-position: cover;
	background-size: 100%;
	background-attachment: fixed;
}

.login-container {
	border-radius: 10px;
	margin: 0px auto;
	width: 350px;
	padding: 30px 35px 15px 35px;
	background: #fff;
	border: 1px solid #eaeaea;
	text-align: left;
	box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}
</style>
