<template>
    
    
    <el-scrollbar >
        <el-card v-for="item in items" :key="item.id" class="scrollbar-demo-item" shadow="hover" @click="checkLog(item)">
            ID: {{ item.id }} | User Name: {{ item.userName }} | URL: {{ item.url }} | IP Address: {{ item.ip }} 
        </el-card>
    </el-scrollbar>
</template>




<script setup>
import { getLogs , updateStatus} from '@/http/api';

import { onMounted, ref } from 'vue';


const items = ref()


const fetchLogs = () => {
    getLogs().then(res => {
        console.log(res)
        items.value = res
    }).catch(res => {
        console.log("异常处理:" + res.message);
        alert(res.message)
    })
}
const checkLog = (item) =>{
    console.log(item);
    updateStatus(item).then(res => {
        fetchLogs()
    }).catch(res => {
        console.log("异常处理:" + res.message);
        alert(res.message)
    })
}
 
onMounted(() => {
    fetchLogs()
}) 
    

</script>


<style scoped>
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
.scrollbar-demo-item:hover{
    background: var(#6eb64a);
}
</style>