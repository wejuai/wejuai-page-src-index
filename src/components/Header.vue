<template>
  <el-row justify="space-around" align="middle" style="height: 120px;">
    <el-col :lg="{span:2,pull:3}" :xs="{span:5,pull:3}" :sm="{span:5,pull:2}">
      <img src="../assets/logo3.gif" class="header-logo" alt="logo" onclick="location.href='/'"/>
    </el-col>
    <el-col :lg="{span:2,push:3}" :xs="{span:5,push:1}" :sm="{span:5,push:3}">
      <el-button type="primary" @click="login" v-if="!loginBool" @center="login" round disabled>登录/注册</el-button>

      <el-popover placement="bottom" :width="160" v-if="loginBool">
        <div>
          <div class="avatar-info-nickname">{{ userInfo.nickName }}</div>
          <div class="avatar-info" @click="toUser">积分：{{ userInfo.integral }}</div>
          <div class="avatar-info" @click="toUser">个人中心</div>
          <div class="div-padding" @click="logout">退出</div>
        </div>
        <template #reference>
          <el-avatar :size="80" :src="userInfo.headImage" style="cursor: pointer;"></el-avatar>
        </template>
      </el-popover>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import service from '../utils/request';

const api = require("../utils/api")

export default {
  name: "Header",
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      loginUrl: 'https://accounts.wejuai.com/login.html?state=' + window.location.href,
      dialogVisible: false,
      userInfo: {
        id: '',
        headImage: '',
        nickName: '',
        integral: 0
      },
      loginBool: false
    }
  },
  methods: {
    getUserInfo() {
      axios.get(api.userInfo).then((res) => {
        if (res.status === 200) {
          this.userInfo = res.data;
          this.loginBool = true;
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          localStorage.setItem('loginBool', 'true');
        }
      }).catch(err => {
        this.loginBool = false;
        localStorage.setItem('loginBool', 'false');
      });
    },
    login() {
      this.$emit("login")
    },
    logout() {
      service.get(api.logout).then((res) => {
        this.loginBool = false;
        localStorage.removeItem('loginBool');
        localStorage.removeItem('userInfo');
        location.href = '/';
      })
    },
    toUser() {
      this.$router.push('/user');
    }
  }
}
</script>

<style scoped>

.header-logo {
  height: 80px;
  padding-top: 20px;
  cursor: pointer;
}

.avatar-info-nickname {
  text-align: center;
  font-size: 20px;
  border-bottom: slategray 1px solid;
  padding: 8px 0;
}

.avatar-info {
  border-bottom: slategray 1px solid;
  text-align: center;
  padding: 8px 0;
  font-size: 15px;
  cursor: pointer;
}

.div-padding {
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
}

</style>
