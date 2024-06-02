<template>
  <div class="page">
    <!--面包屑-->
    <span class="breadcrumb">
      主要功能<i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      病历生成
    </span>

    <el-card class="jwInquiryInstruction-card">
      <el-row>

        <el-col :span="15">

          <MedicalRecord v-if="activePage===4" ref="fifth" style="position: relative;left: 25%"></MedicalRecord>

        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
import MedicalRecord from "@/components/main/MedicalRecord.vue";

export default {
  components: {
    MedicalRecord,
  },
  data() {
    return {

      activePage: 4,

    }
  },

  methods: {}

}
</script>

<style lang="less" scoped>

.page {
  overflow-y: hidden
}

.jwInquiryInstruction-card {
  margin-top: 10px;
  min-height: 800px;
}

.jwInquiryTimeline {
  width: 20%;
  height: 50px;
}

.jwInquiryInstruction-timeline {
  margin-top: 10%;
  margin-left: 30px;
}

</style>
