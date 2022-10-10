<template>
  <div style="color: white;font-size: 25px;padding-bottom: 30px">
    <el-row justify="center" align="middle">
      <el-col :lg="{span:3}" :xs="{span:10}" :sm="{span:4}">
        <div style="height: 170px">
          <div style="position:relative">
            <img :src="celestialBody.smallBackground" style="position:absolute;left:20px;top:5px;width: 140px" alt=""/>
            <img :src="celestialBody.smallTexture"
                 :style="'position:absolute;left:20px;top:5px;width: 140px;transform:rotate('+ celestialBody.angle + 'deg);'"
                 alt=""/>
          </div>
        </div>
      </el-col>
      <el-col :lg="{span:4}" :xs="{span:10}" :sm="{span:4}">
        <a>{{ userInfo.nickName }}</a>
      </el-col>
    </el-row>
    <div style="margin-bottom: 50px"></div>
    <el-row justify="center" align="middle">
      <el-col :lg="{span:4}" :xs="{span:10}" :sm="{span:5}">
        积分: {{ userInfo.integral }}
      </el-col>
      <el-col :lg="{span:4}" :xs="{span:5}" :sm="{span:5}">
        <el-button type="primary" @click="payDialog" round>充值</el-button>
      </el-col>
    </el-row>
    <div style="margin-bottom: 50px"></div>
    <el-row justify="center">
      <el-col :lg="{span:6}" :xs="{span:24}" :sm="{span:10}">
        <el-table :data="orders.content" style="width: 440px" border>
          <el-table-column prop="startedAt" label="创建时间" width='160px'></el-table-column>
          <el-table-column label="通道" width="70px">
            <template #default="scope">
              {{ channel[scope.row.channelType] }}
            </template>
          </el-table-column>
          <el-table-column label="金额" width="100px">
            <template #default="scope">
              {{ scope.row.amount / 100 }} 元
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template #default="scope">
              {{ status[scope.row.status] }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination background layout="prev, pager, next" :current-page="query.page"
                   :page-size="query.size"
                   :total="orders.totalElements"
                   @current-change="list"></el-pagination>
    <el-dialog v-model="dialogPayVisible" title="充值" width="370px">
      <el-input-number v-model="payIntegral" :min="100"/>&nbsp;积分<br><br>
      <img src="../assets/wxpay.png" alt="wxpay" style="width: 50px;cursor: pointer;" @click="pay('wx')">&nbsp;&nbsp;&nbsp;
      <img src="../assets/alipay.png" alt="alipay" style="width: 50px;cursor: pointer;" v-if="browser!=='wx'"
           @click="pay('alipay')">
      <img src="../assets/alipay-h.png" alt="alipay" style="width: 50px;cursor:not-allowed" v-if="browser==='wx'"><br>
    </el-dialog>
    <el-dialog v-model="dialogPay2Visible" width="370px">
      <img style="width: 300px" :src="wxCode" alt="wxCode" v-if="StringUtils.isNotBlank(wxCode)"/><br>
      <el-button type="primary" @click="queryCharge" round>完成</el-button>
    </el-dialog>
  </div>
</template>

<script>
import service from '../utils/request';
import {ElMessage} from 'element-plus'

const api = require("../utils/api")
const String = require('../utils/StringUtils');

export default {
  name: "UserCenter",
  created() {
    this.getUserInfo();
    let userAgentInfo = navigator.userAgent.toLowerCase();
    console.log(userAgentInfo)
    if (userAgentInfo.indexOf('micromessenger') > 0) {
      this.browser = 'wx';
    } else if (userAgentInfo.indexOf('mobile') > 0) {
      this.browser = 'wap'
    } else {
      this.browser = 'pc';
    }
  },
  data() {
    return {
      browser: '',
      payChannel: '',
      payIntegral: 0,
      dialogPayVisible: false,
      dialogPay2Visible: false,
      wxCode: '',
      userInfo: {
        id: '',
        nickName: '',
        integral: 0
      },
      celestialBody: {
        smallBackground: '',
        smallTexture: '',
        angle: 0
      },
      query: {
        page: 1,
        size: 10
      },
      orders: {
        totalElements: 0,
        content: [{}]
      },
      channel: {
        'ALIPAY_WAP': '支付宝',
        'ALIPAY_WEB': '支付宝',
        'WEIXIN_H5': '微信',
        'WEIXIN_JSAPI': '微信',
        'WEIXIN_MINI_APP': '微信',
        'WEIXIN_PC': '微信'
      },
      status: {
        'SUCCEEDED': '成功',
        'STARTED': '支付中',
        'FAILED': '失败'
      },
      StringUtils: String
    }
  },
  methods: {
    getUserInfo() {
      const userData = localStorage.getItem('userInfo');
      if (String.isBlank(userData)) {
        this.$emit('login')
      } else {
        this.userInfo = JSON.parse(userData);
        this.celestialBodyInfo();
        this.list(1);
      }
    },
    celestialBodyInfo() {
      service.get(api.celestialBodyInfo + '?type=USER&id=' + this.userInfo.id).then((res) => {
        this.celestialBody = res.data;
      });
    },
    login() {
      this.dialogVisible = true;
    },
    payDialog() {
      this.dialogPayVisible = true;
    },
    pay(type) {
      let params = {
        amount: this.payIntegral,
        state: location.href
      }
      if (type === 'wx' && this.browser === 'pc') {
        params.type = 'WEIXIN_PC';
      } else if (type === 'wx' && this.browser === 'wx') {
        params.type = 'WEIXIN_JSAPI';
      } else if (type === 'wx' && this.browser === 'wap') {
        params.type = 'WEIXIN_H5';
      } else if (type === 'alipay' && this.browser === 'pc') {
        params.type = 'ALIPAY_WEB';
      } else if (type === 'alipay' && this.browser === 'wap') {
        params.type = 'ALIPAY_WAP';
      } else {
        ElMessage({
          message: '不支持的支付方式',
          type: 'error',
        });
        return;
      }
      service.post(api.recharge, params).then((res) => {
        console.log(res)
        if (params.type === 'WEIXIN_PC') {
          this.wxCode = 'https://api.pwmqr.com/qrcode/create/?url=' + res.data.qr;
        } else if (params.type === 'ALIPAY_WEB' || params.type === 'ALIPAY_WAP') {
          window.open(res.data.html);
        } else if (params.type === 'WEIXIN_H5') {
          window.open(res.data.url);
        } else if (params.type === 'WEIXIN_JSAPI') {
          this.onBridgeReady(res.data)
        }
        this.dialogPay2Visible = true;
      });
    },
    list(page) {
      this.query.page = page;
      page = page > 0 ? page - 1 : 0;
      service.get(api.orders + '?channelType=ALL&page=' + page).then((res) => {
        this.orders = res.data;
      });
    },
    queryCharge() {
      this.dialogPayVisible = false;
      this.dialogPay2Visible = false;
      service.get(api.userInfo).then((res) => {
        this.userInfo = res.data;
        this.loginBool = true;
        localStorage.setItem('userInfo', this.userInfo.toString());
        localStorage.setItem('loginBool', 'true');

        this.list(this.query.page);
      });
    },
    onBridgeReady(params) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": params.appId,
            "timeStamp": params.timeStamp,
            "nonceStr": params.nonceStr,
            "package": params.package,
            "signType": params.signType,
            "paySign": params.paySign
          },
          function (res) {
            // if (res.err_msg === "get_brand_wcpay_request:ok") {
            // }
          });
      // if (typeof WeixinJSBridge == "undefined") {
      //   if (document.addEventListener) {
      //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      //   } else if (document.attachEvent) {
      //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      //   }
      // } else {
      //   this.onBridgeReady(params);
      // }
    }
  }
}
</script>

<style scoped>

</style>
