import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';


export const useTokenStore = defineStore('token',()=>{

    const token = ref(localStorage.getItem('token') || null);

    const setToken = (newToken)=>{
        token.value = newToken;
        console.log(newToken)
        localStorage.setItem('token', newToken)
    }


    const clearTokenAuth = ()=> {
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        token, setToken, clearTokenAuth
    }
},{
    persist: true //持久化存储
});

export const useRoleStore = defineStore('role',()=>{

    const role = ref(localStorage.getItem('role') || null);

    const setRole = (newRole)=>{
        role.value = newRole;
        localStorage.setItem('role', newRole)
    }


    const clearRoleAuth = ()=> {
        role.value = null
        localStorage.removeItem('role')
    }

    return {
        role, setRole, clearRoleAuth
    }
},{
    persist: true //持久化存储
});





/* export const useUserCounter = defineStore('user', () => {
    const userInfo = ref({})
    // 获取用户信息
    const setUserInfo = async () => {
        await axios.get("/api/get_user_information").then(res => {
            if (res.data.code === "1000") {
                userInfo.value = res.data.data
            }
        }, res => {
            console.log('请求失败')
        });
    }
    //清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        sessionStorage.removeItem('refresh_token')
        sessionStorage.removeItem('Authorization')
    }
    //判断是否有权限
    const hasPermission = (name) =>{
        let flag = false
        let permissionId = null
        permissions.forEach(item =>{
            if(name === item.name){
                permissionId = item.id
            }
        })
        if(permissionId && userInfo.value.permission){
            if(userInfo.value.permission.split(',').indexOf((permissionId.toString())) != -1){
                flag = true
            }
        }
        return flag
    }
    return { userInfo,setUserInfo,clearUserInfo,hasPermission }
}, {
    persist: true //持久化存储
})

 */
