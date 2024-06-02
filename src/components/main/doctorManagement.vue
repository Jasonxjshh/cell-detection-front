<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" :span="24" class="demo-form-inline">
      <el-form-item label="医生姓名" class="custom-lable">
        <el-input v-model="formInline.name" placeholder="请输入医生姓名" clearable />
      </el-form-item>
      <el-form-item label="手机号码" class="custom-lable">
        <el-input v-model="formInline.phone" placeholder="请输入手机号码" clearable />
      </el-form-item>
      <el-form-item label="创建时间" class="custom-lable">
        <el-date-picker v-model="formInline.date" type="date" placeholder="选择时间" clearable />
      </el-form-item>
      <el-form-item class="custom-lable">
        <el-button type="primary" @click="onSubmit" style="height: 90%;">Query</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="success" :icon="Plus" @click="clearDialog">
        <span>新增</span>
      </el-button>
      <el-button type="primary" :icon="Edit" @click="fillDialog">
        <span>修改</span>
      </el-button>
      <el-button type="danger" :icon="Delete" @click="deleteUser(1)">
        <span>删除</span>
      </el-button>
    </div>

    <el-table ref="multipleTableRef" :data="tData.tableData" :table-layout="tableLayout"
      @selection-change="handleSelectionChange" class="demo-table-inline" stripe height=526>
      <el-table-column type="selection" width="55">

      </el-table-column>

      <el-table-column label="编号" property="id" header-align="center" align="center" width='100'>
      </el-table-column>
      <el-table-column property="name" label="姓名" header-align="center" align="center" width='150' />
      <el-table-column property="username" label="用户名" header-align="center" align="center" width='150' />
      <el-table-column property="phone" label="手机号" header-align="center" align="center" width='200' />
      <el-table-column property="email" label="邮箱" header-align="center" align="center" width='200' />
      <el-table-column property="age" label="年龄" header-align="center" align="center" width='100' />
      <el-table-column property="sex" label="性别" header-align="center" align="center" width='100' />
      <el-table-column property="createAt" label="创建时间" header-align="center" align="center" width='300' />
      <el-table-column label="操作" header-align="center" align="center">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" circle @click="fillDialog"
            @mouseover="multipleTableRef.toggleRowSelection(scope.row, true)" />
          <el-button type="danger" :icon="Delete" circle @click="deleteUser(1)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">

      <el-form :model="dialogForm">

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
              <el-input v-model="dialogForm.age" style="width: 175px; margin-left: 10px" placeholder="请输入您的年龄" />
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="角色">
          <el-select v-model="dialogForm.role" placeholder="请您选择你的角色" :disabled="roleInputDisabled">
            <el-option label="管理员" value='0' />
            <el-option label="医生" value='1' />
            <el-option label="患者" value='2' />

          </el-select>
        </el-form-item>
      </el-form>
      <span>* 初始用户默认密码为: 123456</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false, addorUpdateUser(1)">
            Confirm
          </el-button>
        </div>
      </template>

    </el-dialog>
    <div style="margin-top: 20px;">
      <el-pagination @current-change="handleCurrentChange, getAllUserData(1)" small background
        layout=" prev, pager, next, total" :total="totalItems" v-model:current-page="currentPage" />
    </div>


  </div>



</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import bcrypt from 'bcryptjs'
import { ElTable, rowContextKey } from 'element-plus'
import { add, getUsersByPage, update, deleteUsers } from "@/http/api.js"
import {
  Plus,
  Delete,
  Edit,
  User
} from '@element-plus/icons-vue'

onMounted(() => {
  getAllUserData(1)
})

const tableLayout = "fixed"
const dialogFormVisible = ref(false)
const dialogTitle = ref("")
const addorUpdateMode = ref(0)
const roleInputDisabled = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)
const formInline = reactive({
  name: '',
  phone: '',
  date: '',
})

const tData = reactive({
  tableData: [] as User[]
})


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


interface User {
  id: Number,
  name: '张三',
  username: 'Jason',
  password: '123456',
  phone: '15855559999',
  email: '15855559999@qq.com',
  sex: '男',
  age: 18,
  role: 1
  avatar: String,
  createAt: Date,
  updateAt: Date,
  createBy: Number,
  updateBy: Number
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

const getAllUserData = (role) => {
  let params = {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    role: role
  };
  console.log(params);

  getUsersByPage(params).then((res: any) => {
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



const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  console.log(multipleSelection);

}

const changeRole = () => {
  if (dialogForm.role == 0) {
    dialogForm.role = "管理员"
  } else if (dialogForm.role == 1) {
    dialogForm.role = "医生"
  } else if (dialogForm.role == 2) {
    dialogForm.role = "患者"
  }
}
const addorUpdateUser = async (role) => {
  try {
    if (addorUpdateMode.value == 0) {
      dialogForm.password = "123456";
      const res = await add(dialogForm);
      getAllUserData(role);
    } else if (addorUpdateMode.value == 1) {
      dialogForm.role = multipleSelection.value[0].role;
      dialogForm.id = multipleSelection.value[0].id;
      const res = await update(dialogForm);
      getAllUserData(role);
    }
  } catch (error) {
    console.log("异常处理:", error.message);
    alert(error.message);
  }
};

const fillDialog = () => {
  if (multipleSelection.value.length != 1) {
    alert("请选择一个您要编辑的用户！")
  } else {
    console.log(multipleSelection.value[0]);

    dialogForm.name = multipleSelection.value[0].name
    dialogForm.username = multipleSelection.value[0].username
    dialogForm.phone = multipleSelection.value[0].phone
    dialogForm.email = multipleSelection.value[0].email
    dialogForm.sex = multipleSelection.value[0].sex
    dialogForm.age = multipleSelection.value[0].age
    dialogForm.role = multipleSelection.value[0].role
    changeRole()
    roleInputDisabled.value = true
    dialogFormVisible.value = true
    dialogTitle.value = "修改用户"
    addorUpdateMode.value = 1
  }
}

const clearDialog = () => {
  console.log(dialogForm);
  dialogFormVisible.value = true
  dialogTitle.value = '新增用户'
  roleInputDisabled.value = false
  addorUpdateMode.value = 0
  dialogForm.name = null
  dialogForm.username = null
  dialogForm.phone = null
  dialogForm.email = null
  dialogForm.sex = null
  dialogForm.age = null
  dialogForm.role = null
}


const deleteUser = (role) => {
  if (multipleSelection.value.length == 0) {
    alert("请选择您要删除的用户！")
  } else {
    const userIDs = []
    multipleSelection.value.forEach((item) => {
      userIDs.push(item.id)
    })

    deleteUsers(userIDs).then(res => {
      getAllUserData(role)

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