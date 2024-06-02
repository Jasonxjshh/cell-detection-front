<template>
  <div>
    <div>

      <el-card>
        <div class="header">
          <br/>
          <span class="sonHeader search_text"><b>XX 市中心医院 门诊电子病历</b></span>
          <br/><br/><br/>
        </div>
        <div>
          <span>就诊科室：</span>
          <el-input v-model="addForm.department" placeholder="" style="width: 20%;"></el-input>
          <el-date-picker
              v-model="addForm.time"
              type="datetime"
              placeholder="选择就诊时间"
              format="yyyy-MM-dd HH:mm"
              align="right"
              style="width:28%;margin-left: 35%">
          </el-date-picker>
        </div>

        <el-descriptions :column="2" border style="margin-top: 20px" :labelStyle="{'text-align':'center'}">
          <el-descriptions-item label="姓名
            ">
            <el-input v-model="addForm.name"></el-input>
          </el-descriptions-item>

          <el-descriptions-item label="性别
            ">
            <el-input v-model="addForm.sex"></el-input>
          </el-descriptions-item>

          <el-descriptions-item label="民族
            ">
            <el-input v-model="addForm.nation"></el-input>
          </el-descriptions-item>

          <el-descriptions-item label="类型
            ">
            <el-input v-model="addForm.type" placeholder="初诊 | 复诊"></el-input>
          </el-descriptions-item>

          <el-descriptions-item :span="2" label="联系电话
            ">
            <el-input v-model="addForm.phone_number"></el-input>
          </el-descriptions-item>

          <el-descriptions-item :span="2" label="住址
            ">
            <el-input v-model="addForm.home"></el-input>
          </el-descriptions-item>

        </el-descriptions>

        <el-descriptions :column="1" border style="margin-top: 20px"
                         :labelStyle="{'width':'25%','text-align':'center'}">

          <el-descriptions-item label="主诉
            ">
            <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="addForm.chief_complaint">
            </el-input>
          </el-descriptions-item>

          <el-descriptions-item label="现病史
            ">
            <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="addForm.present_medical_history">
            </el-input>
          </el-descriptions-item>

          <el-descriptions-item label="既往史
            ">
            <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="addForm.past_history">
            </el-input>
          </el-descriptions-item>

          <el-descriptions-item label="体格检查
            ">
            <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="addForm.physical_examination">
            </el-input>
          </el-descriptions-item>

          <el-descriptions-item label="初步诊断
            ">
            <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="addForm.preliminary_diagnosis">
            </el-input>
          </el-descriptions-item>

          <el-descriptions-item label="处置
            ">
            <el-input
                type="textarea"
                :rows="2"
                placeholder=""
                v-model="addForm.disposition">
            </el-input>
          </el-descriptions-item>

        </el-descriptions>

      </el-card>

      <div style="float: right;margin-top: 15px">
        <el-button size="medium" class="btn-default" @click="makeNotice()">生成文书</el-button>
      </div>

    </div>

  </div>
</template>

<script>

export default {

  name: "TalkOne",

  data() {
    return {

      addForm: {
        department: '',
        time: '',
        name: '',
        sex: '',
        phone_number: '',
        type: '',
        home: '',
        nation: '',
        chief_complaint: '',
        present_medical_history: '',
        past_history: '',
        physical_examination: '',
        preliminary_diagnosis: '',
        disposition: '',
        file_name: '',
      },

    }
  },
  methods: {

    //生成文书
    async makeNotice() {

      this.addForm.file_name = 'XX 市中心医院 门诊电子病历';

      const {data: res} = await this.$http.post("http://localhost:8080/medicalRecord", this.addForm, {responseType: 'blob'});

      var blob = new Blob([res], {
        type: "application/octet-stream",
      })
      var downloadUrl = window.URL.createObjectURL(blob)
      var anchor = document.createElement('a')
      anchor.href = downloadUrl
      anchor.setAttribute("download", this.addForm.file_name + ".docx");
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)

    },

  }
}
</script>

<style lang="less" scoped>

.header {
  text-align: center;
  font-size: 24px;
}
</style>

