<template>
    <div class="login-wrap">
        <el-form :model="dialogForm" class="login-container">
            <h1 class="title" >细胞检测系统注册</h1>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="12">
                    <el-form-item label="姓名" :error="v$.name.$error ? '姓名是必填项' : ''">
                        <el-input v-model="dialogForm.name" style="width: 175px;" placeholder="请输入您的姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名" :error="v$.username.$error ? '用户名必须且为英文字母' : ''">
                        <el-input v-model="dialogForm.username" style="width: 175px;" placeholder="请输入您的用户名" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="12">
                    <el-form-item label="手机" :error="v$.phone.$error ? '请输入有效的手机号' : ''">
                        <el-input v-model="dialogForm.phone" style="width: 175px;" placeholder="请输入您的手机" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮 箱" :error="v$.email.$error ? '请输入有效的邮箱' : ''">
                        <el-input v-model="dialogForm.email" style="width: 175px;" placeholder="请输入您的邮箱" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="12">
                    <el-form-item label="性别" :error="v$.sex.$error ? '性别是必填项' : ''">
                        <el-select v-model="dialogForm.sex" placeholder="请选择您的性别" style="width: 175px;">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年 龄" :error="v$.age.$error ? '年龄必须在0到150岁之间' : ''">
                        <el-input v-model="dialogForm.age" type="number" placeholder="请输入您的年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="密码" :error="v$.password.$error ? '密码至少6个字符' : ''">
                <el-input type="password" v-model="dialogForm.password" placeholder="请输入您的密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="角色" :error="v$.role.$error ? '角色是必填项' : ''">
                <el-select v-model="dialogForm.role" placeholder="请您选择你的角色">
                    <el-option label="管理员" value='0' />
                    <el-option label="医生" value='1' />
                    <el-option label="患者" value='2' />
                </el-select>
            </el-form-item>
            <el-row style="margin-bottom: 10px;">
                <el-col :span="10" style="align-self: auto;">
                    <el-form-item>
                <el-button type="primary" style="width:100%;" @click="goToHome">返回</el-button>
            </el-form-item>
                </el-col>
                <el-col :span="10" style="margin-left: auto;">
                    <el-form-item>
                <el-button type="success" style="width:100%;" @click="doRegister">注册</el-button>
            </el-form-item>
                </el-col>
            </el-row>
            
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRoleStore, useTokenStore } from '../stores/user.js'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers, alpha, integer } from '@vuelidate/validators'
import { register } from "../http/api.js"

// 自定义验证器
const phone = helpers.regex('phone', /^1[3-9]\d{9}$/);
const ageRange = (value) => value >= 0 && value <= 150

const router = useRouter()

const dialogForm = reactive({
  id: null,
  name: '',
  username: '',
  password: '',
  phone: '',
  email: '',
  sex: '',
  age: null,
  role: null
})

const rules = {
  name: { required },
  username: { required, alpha },
  phone: { required, integer},
  email: { required, email },
  sex: { required },
  age: { required, ageRange },
  password: { required, minLength: minLength(6) },
  role: { required }
}

const v$ = useVuelidate(rules, dialogForm)

const tokenStore = useTokenStore()
const roleStore = useRoleStore()

const doRegister = async () => {
    v$.value.$touch() // 触发验证
    if (v$.value.$invalid) {
        // 如果验证失败，不提交表单
        console.log("表单验证失败");
        return;
    }

    try {
        console.log(dialogForm);
        const res = await register(dialogForm);
        console.log(res);
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
}

const goToHome = () => {
    router.push({ name: 'login' });
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



<!-- <template>
    <div class="login-wrap">
        <el-form :model="dialogForm" class="login-container">
            <h1 class="title">细胞检测系统注册</h1>
            <el-row style="margin-bottom: 10px; ">
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="dialogForm.name" style="width: 175px;" placeholder="请输入您的姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名">
                        <el-input v-model="dialogForm.username" style="width: 175px;" placeholder="请输入您的用户名" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 10px; ">
                <el-col :span="12">
                    <el-form-item label="手机">
                        <el-input v-model="dialogForm.phone" style="width: 175px;" placeholder="请输入您的手机" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮 箱" label-width=52>
                        <el-input v-model="dialogForm.email" style="width: 175px;" placeholder="请输入您的邮箱" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 10px; ">
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-select v-model="dialogForm.sex" placeholder="请选择您的性别" style="width: 175px;">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年 龄">
                        <el-input v-model="dialogForm.age" style=""
                            placeholder="请输入您的年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="密码">
				<el-input  type="password" v-model="dialogForm.password" placeholder="请输入您的密码"
					show-password></el-input>
			</el-form-item>
            <el-form-item label="角色">
                <el-select v-model="dialogForm.role" placeholder="请您选择你的角色" >
                    <el-option label="管理员" value='0' />
                    <el-option label="医生" value='1' />
                    <el-option label="患者" value='2' />

                </el-select>
            </el-form-item>
            <el-form-item>
				<el-button type="primary" style="width:100%;" @click="doRegister()">注册</el-button>
			</el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { register, getUserByToken } from "../http/api.js"
import { useRouter } from 'vue-router'
import bcrypt from 'bcryptjs'
import { useRoleStore, useTokenStore } from '../stores/user.js'
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';


const router = useRouter()

const dialogForm = reactive({
  id: null,
  name: null,
  username: null,
  password: null,
  phone: null,
  email: null,
  sex: null,
  age: null,
  role: null
})
const tokenStore = useTokenStore()
const roleStore = useRoleStore()
const doRegister = async () => {
    try {
        console.log(dialogForm);
        const res = await register(dialogForm);
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
 -->