<template>
  <Header @login="login"/>
  <router-view @login="login"/>
  <Footer/>
  <el-dialog v-model="dialogVisible" width="370px">
    <iframe id="sub" name="sub" v-bind:src="loginUrl"
            style="width: 100%;height: 340px;border: none;margin: 0;"></iframe>
  </el-dialog>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const api = require("./utils/api");

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  data() {
    return {
      dialogVisible: false,
      loginUrl: 'https://accounts.wejuai.com/login.html?state=' + window.location.href,
    }
  },
  methods: {
    login() {
      this.dialogVisible = true;
    },
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("https://media.wejuai.com/SYS_IMAGE/exploreBackground.png") repeat;
  background-size: contain;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@font-face {
  font-family: Ali-light;
  src: url('font/ali-light.ttf')
}

@font-face {
  font-family: Ali-bold;
  src: url('font/ali-bold.ttf')
}

@font-face {
  font-family: Ali-def;
  src: url('font/ali-def.ttf')
}

@font-face {
  font-family: Ali-heavy;
  src: url('font/ali-heavy.ttf')
}
</style>
