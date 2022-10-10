<template>
  <div style="margin: 0 auto;text-align: center;width: 90%;">
    <div style="text-align: center;font-size: 45px;color: white;padding-top: 100px;font-weight: 600;">
      遨游你内心中的小秘密
    </div>
    <div style="margin-top: 50px">
      <!-- <el-input v-model="input" placeholder="来调戏我吧~" style="width: 200px;" @keyup.enter="searchHobby"/>&nbsp;&nbsp;&nbsp; -->
      <el-input v-model="input" placeholder="来调戏我吧~" style="width: 200px;"/>&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="searchHobby" disabled>搜索</el-button>
    </div>

    <div style="margin-top: 100px;padding-bottom:100px;text-align: center;font-size: 20px;color: white;">
      <p>wejuai是一款社交类的社区产品，它专门为有秘密爱好但又想结交朋友的人群开发</p>
      <p>不同于知乎、豆瓣传统社交软件，它能够根据爱好创建不同的讨论区，避开没有同类爱好的人群</p>
      <p>但是现在已经停止运营，所以整个项目都开源了，https://github.com/wejuai</p>
      <div>
        <img src="https://media.wejuai.com/SYS_IMAGE/wx.png" style="width: 300px;" alt="wx-code">
      </div>
    </div>
  </div>
</template>

<script>

import service from '../utils/request';
import {ElMessage} from 'element-plus'

const api = require("../utils/api")
const String = require('../utils/StringUtils');

export default {
  name: 'Home',
  created() {
  },
  data() {
    return {
      input: '',
    }
  },
  methods: {
    searchHobby() {
      if (String.isBlank(this.input)) {
        ElMessage({
          message: '请输入内容',
          type: 'warning',
        })
        return
      }
      service.get(api.hobbySearch + '?tab=' + this.input).then((res) => {
        if (res.data.type) {
          ElMessage({
            message: '成功搜索到“' + res.data.name + '”，请去小程序查看详细内容吧~',
            type: 'success'
          });
        } else {
          ElMessage({
            message: res.data.answer,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
