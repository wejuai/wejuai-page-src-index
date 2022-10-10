import axios from 'axios';
import {ElMessage} from 'element-plus';

const service = axios.create({
    timeout: 3000
});

service.interceptors.response.use(
    response => {
        return response;
    }, error => {
        switch (error.response.status) {
            case 400:
                console.error(error)
                ElMessage({
                    message: error.response.data.errorDescription,
                    duration: 5000,
                    type: 'error'
                })
                break;
            case 401:
                ElMessage({
                    message: '尚未登录',
                    type: 'error',
                    duration: 5000
                });
                window.location.href = '/#/login' //'https://console.wejuai.com'
                break;
            case 403:
                ElMessage({
                    message: '没有权限',
                    type: 'error',
                    duration: 5000
                });
                break;
            case 404:
                ElMessage({
                    message: '没有该路径',
                    type: 'error',
                    duration: 5000
                });
        }
        if (error.response.status >= 500) {
            ElMessage({
                message: '服务器错误',
                type: 'error',
                duration: 5000
            });
        }
        return Promise.reject(error);
    }
);

export default service;
