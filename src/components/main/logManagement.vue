<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" :span="24" class="demo-form-inline">
            <el-form-item label="用户编号" class="custom-lable">
                <el-input v-model="formInline.userId" type="Number" placeholder="请输入用户编号" clearable />
            </el-form-item>
            <el-form-item label="用户名" class="custom-lable">
                <el-input v-model="formInline.userName" placeholder="请输入用户名" clearable />
            </el-form-item>
            <el-form-item label="接口查询" class="custom-lable">
                <el-input v-model="formInline.url" placeholder="请输入要查询的接口" clearable />
            </el-form-item>
            <el-form-item class="custom-lable">
                <el-button type="primary" @click="onSubmit" style="height: 90%;">Query</el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-button type="primary" :icon="Edit" @click="fillDialog">
                <span>查看</span>
            </el-button>
            <el-button type="danger" :icon="Delete" @click="deleteLog">
                <span>删除</span>
            </el-button>
        </div>

        <el-table ref="multipleTableRef" :data="tData.tableData" :table-layout="tableLayout"
            @selection-change="handleSelectionChange" class="demo-table-inline" stripe height=526>
            <el-table-column type="selection" width="55">

            </el-table-column>

            <el-table-column label="用户编号" property="userId" header-align="center" align="center" width='80'>
            </el-table-column>
            <el-table-column property="userName" label="用户名" header-align="center" align="center" width='150' />
            <el-table-column property="url" label="请求地址" header-align="center" align="center" width='300'
                show-overflow-tooltip />
            <el-table-column property="ip" label="IP地址" header-align="center" align="center" width='150' />
            <el-table-column property="agent" label="浏览器代理" header-align="center" align="center" width='300'
                show-overflow-tooltip />
            <el-table-column property="createAt" label="创建时间" header-align="center" align="center" width='175' />
            <el-table-column label="操作" header-align="center" align="center">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" circle @click="fillDialog"
                        @mouseover="multipleTableRef.toggleRowSelection(scope.row, true)" />
                    <el-button type="danger" :icon="Delete" circle @click="deleteLog" />
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogFormVisible" title="日志信息" width="500">

            <el-form :model="dialogForm">

                <el-row style="margin-bottom: 10px; ">
                    <el-col :span="12">
                        <el-form-item label="用户编号">
                            <el-input v-model="dialogForm.userId" style="width: 150px;" disabled />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名">
                            <el-input v-model="dialogForm.userName" style="width: 175px;" disabled />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="URL">
                    <el-input v-model="dialogForm.url" disabled />
                </el-form-item>

            <el-form-item label="IP">
                <el-input v-model="dialogForm.ip" disabled />
            </el-form-item>

            <el-form-item label="浏览器代理">
                <el-input type="textarea" v-model="dialogForm.agent" disabled />
            </el-form-item>

            <el-form-item label="创建时间">
                <el-input type="data" v-model="dialogForm.createAt" disabled />
            </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                </div>
            </template>

        </el-dialog>
        <div style="margin-top: 20px;">
            <el-pagination @current-change="handleCurrentChange, getAllLogData" small background
                layout=" prev, pager, next, total" :total="totalItems" v-model:current-page="currentPage" />
        </div>


    </div>



</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElTable, rowContextKey } from 'element-plus'
import {  getLogsByPage,  deleteLogs} from "@/http/api.js"
import {
    Plus,
    Delete,
    Edit,
    User
} from '@element-plus/icons-vue'

onMounted(() => {
    getAllLogData()
})

const tableLayout = "fixed"
const dialogFormVisible = ref(false)
const roleInputDisabled = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const formInline = reactive({
    userId: '',
    userName: '',
    url: '',
})

const tData = reactive({
    tableData: [] as Log[]
})


const dialogForm = reactive({
    userId: null,
    userName: null,
    url: null,
    ip: null,
    agent: null,
    createAt: null
})


interface Log {
    id: Number,
    userId: Number,
    userName: String,
    url: String,
    ip: String,
    agent: String,
    createAt: Date,
    updateAt: Date,
    createBy: Number,
    updateBy: Number
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Log[]>([])

const getAllLogData = () => {
    let params = {
        currentPage: currentPage.value,
        pageSize: pageSize.value
    };
    console.log(params);

    getLogsByPage(params).then((res: any) => {
        console.log(res);
        tData.tableData = res.list
        totalItems.value = res.total; // 修改总页数
    });
}

const handleCurrentChange = (val: number) => {
    console.log(val);
    currentPage.value = val;
};
const onSubmit = () => {
    console.log('submit!')
}



const handleSelectionChange = (val: Log[]) => {
    multipleSelection.value = val
    console.log(multipleSelection);

}



const fillDialog = () => {
    if (multipleSelection.value.length != 1) {
        alert("请选择一个您要编辑的用户！")
    } else {
        console.log(multipleSelection.value[0]);

        dialogForm.userId = multipleSelection.value[0].userId
        dialogForm.userName = multipleSelection.value[0].userName
        dialogForm.url = multipleSelection.value[0].url
        dialogForm.ip = multipleSelection.value[0].ip
        dialogForm.agent = multipleSelection.value[0].agent
        dialogForm.createAt = multipleSelection.value[0].createAt
        dialogFormVisible.value = true
    }
}


const deleteLog = () => {
    if (multipleSelection.value.length == 0) {
        alert("请选择您要删除的用户！")
    } else {
        const logIDs = []
        multipleSelection.value.forEach((item) => {
            logIDs.push(item.id)
        })

        deleteLogs(logIDs).then(res => {
            getAllLogData()

        }).catch(res => {
            console.log("异常处理:" + res.message);
            alert(res.message)
        })
    }
}
</script>

<style>
.demo-form-inline .el-input {
    --el-input-width: 200px;
    --el-input-height: 25px;
}

.custom-lable .el-form-item__label {
    width: 70px;
    font-weight: bolder;
    font-size: 14px;
}

.demo-form-inline .el-select {
    --el-select-width: 200px;
}

.custom-lable {
    margin-top: 10px
}

.container {

    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.demo-form-inline {
    width: 100%;

}

.demo-table-inline {
    width: 100%;
    margin-top: 20px;
}
</style>