<template>
  <div>
    <div class="footer-problem">
      我们也只是刚起步~所以需要一些
      <span @click="showAdviceWindow=true" style="font-size: 17px;cursor: pointer;">
        <u>建议和问题反馈</u>
      </span>~&nbsp;&nbsp;&nbsp;&nbsp;
      如果你喜欢的没有，也可以
      <span @click="showHobbyWindow=true" style="font-size: 17px;cursor: pointer;">
        <u>申请你的兴趣</u>
      </span>
    </div>

    <div class="footer-text">
      <div style="text-align: center">QQ群:723653281&nbsp;&nbsp;&nbsp;&nbsp;邮箱:ceo@wejuai.com&nbsp;&nbsp;&nbsp;&nbsp;Copyright
        © {{ year }} 为聚爱 All Rights
        Reserved&nbsp;&nbsp;&nbsp;&nbsp;互联网ICP备案:
        <a href="https://beian.miit.gov.cn" target="_blank"
           style="color:white;text-decoration:underline">鲁ICP备18039967号</a>&nbsp;&nbsp;&nbsp;
        <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" style="width: 20px;margin-top: 3px;"
             alt=""/>
        鲁公网安备: <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37060202000896" target="_blank"
                  style="text-decoration:underline;color: white">37060202000896号</a>
      </div>
    </div>
    <el-dialog v-model="showAdviceWindow" title="建议和反馈" width="370px">
      <a>联系方式：</a>
      <el-input v-model="advice.contact"></el-input>
      <br><br>
      <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容：</a>
      <el-input v-model="advice.text" type="textarea"></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="showAdviceWindow = false">取消</el-button>
        <el-button type="primary" @click="submitAdvice" disabled>提交</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showHobbyWindow" title="爱好申请" width="370px">
      <a>联系方式：</a>
      <el-input v-model="hobby.contact"></el-input>
      <br><br>
      <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容：</a>
      <el-input v-model="hobby.text" type="textarea"></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="showHobbyWindow = false">取消</el-button>
        <el-button type="primary" @click="submitHobbyApply" disabled>提交</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>

import service from '../utils/request';
import {ElMessage} from 'element-plus'

const api = require("../utils/api")

export default {
  data() {
    return {
      showAdviceWindow: false,
      contact: '',
      advice: {
        contact: '',
        text: ''
      },
      hobby: {
        contact: '',
        text: ''
      },
      showHobbyWindow: false,
      isPc: true,
      year: '',
    }
  },
  created() {
    this.year = new Date().getFullYear() + '';
  },
  computed: {},
  methods: {
    submitAdvice() {
      service.post(api.opinion, this.advice).then((res) => {
        ElMessage({
          message: '提交成功',
          type: 'success',
        })
        this.advice = {
          contact: '',
          text: ''
        }
      });
      this.showAdviceWindow = false;
    },
    submitHobbyApply() {
      service.post(api.hobbyApply, this.hobby).then((res) => {
        ElMessage({
          message: '提交成功',
          type: 'success',
        })
        this.hobby = {
          contact: '',
          text: ''
        }
      });
      this.showHobbyWindow = false;
    }
  }
}
</script>
<style scoped>

.footer-text {
  text-align: center;
  color: white;
  width: 100%;
  padding-bottom: 10px;
}

.footer-problem {
  text-align: center;
  color: white;
}

.el-input {
  width: 220px;
}

.el-textarea {
  width: 220px;
}
</style>
