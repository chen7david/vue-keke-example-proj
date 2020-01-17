import $message from 'element-ui/lib/message'
import $loading from 'element-ui/lib/loading'
import store from "si-store";
import axios from "axios";
import api from "./env";


let httpLoading = null;

function getParams(data) {
  let dataStr = ""; // 数据拼接字符串
  Object.keys(data).forEach(key => {
    dataStr += `${key}=${encodeURIComponent(data[key])}&`;
  });

  if (dataStr !== "") {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
  }
  return dataStr;
}

// 申请一个新的http实例
const instance = axios.create({
  baseURL: api,
  method: "post",
  timeout: 60000, // 设置超时时间为60秒
  validateStatus(status) {
    return (status >= 200 && status < 300) || status === 304;
  },
  toastDuration: 3000,
  errBack: false, // 接口错误是否自动回退上一个页面,
  isLoading: true, // 请求是否需要loading,
  isToken: true, // 接口是否需要token
  isLoginPage: false, //是否登陆页面，注册页面，350时候不跳转到登陆页面
  isReturnMsg: false // 接口请求是否需要catch错误信息，
});

let loading = null

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.isLoading) {
      // console.log(config.url, config.isLoading);
      loading = $loading.service({
        lock: false,
        text: '加载中...',
        spinner: 'icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }

    let {
      url
    } = config;
    if (url.indexOf("/") !== 0) {
      url = `/${url}`;
    }
    config.url = api + url;


    const token = store.get("userInfo") ? store.get("userInfo").token : "";
    config.isToken && (config.headers.Authorization = token);

    // 默认请求方式 json格式
    if (
      config.method.toUpperCase() === "POST" &&
      config.type.toUpperCase() === "JSON"
    ) {
      config.headers["Content-Type"] = "application/json";
      config.data = JSON.stringify(config.data);
    }

    //  formdata 格式参数
    if (
      config.method.toUpperCase() === "POST" &&
      config.type.toUpperCase() === "FORMDATA"
    ) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
      const formData = new FormData();
      for (const key in config.data) {
        formData.append(key, config.data[key]);
      }
      config.data = formData;
    }

    //  上传文件格式参数
    if (config.method.toUpperCase() === "POST" && config.type === "upload") {
      config.headers["Content-Type"] = "multipart/form-data";
      config.headers.Accept = "*/*";
      // 上传文件
      const formData = new FormData();
      const files = config.data.file || {};
      for (const key in config.data.params) {
        formData.append(key, config.data.params[key]);
      }

      for (const key in files) {
        // console.log(files.hasOwnProperty(key), files[key])
        if (files.hasOwnProperty(key)) {
          if (files[key].length > 1) {
            for (let i = 0; i < files[key].length; i++) {
              formData.append(key, files[key][i].file);
            }
          } else {
            formData.append(key, files[key].file);
          }
        }
        console.log(formData);
      }

      config.data = formData;
      // delete config.file
    }

    //  get请求参数
    if (config.method.toUpperCase() === "GET") {
      const keys = Object.keys(config.data);
      config.url = keys.length > 0 ? `${url}?${getParams(config.data)}` : url;
      delete config.data;
    }

    return config;
  },
  error => {
    console.log(error);
    if (error.config && error.config.isReturnMsg) {
      Promise.reject(error);
    }
  }
);

// 响应拦截器
instance.interceptors.response.use(
  res => {
    const {
      data
    } = res;
    if (res.config.isLoading) {
      // console.log(res.config.url, res.config.isLoading);
      loading && loading.close();
    }
    return new Promise((resolve, reject) => {
      if (data.code && data.code === "200") {
        resolve(data);
      } else {
        if (data.code === "350" && !res.config.isLoginPage) {
          // store.remove("userInfo");
          // window.location.href = "/login";
          reject(data);
        } else {
          if (res.config.isReturnMsg) {
            reject(data);
          } else {
            $message(data.message || "接口错误");
          }
        }
      }
    });
  },
  error => {
    const {
      response
    } = error;
    if (response) {
      const {
        data,
        status
      } = response;
      let errMessage = data.message;
      switch (status) {
        case 500:
          errMessage = "服务器开小差了，请稍候再试";
          break;
        case 404:
          errMessage = "404,接口不存在";
          break;
        default:
          errMessage = data.message || "接口请求失败！";
          break;
      }
      loading && loading.close()
      // 全局错误提示
      $message(errMessage || "");
      console.log(error, "请求接口超过一分钟无响应");
      // !error.config.isReturnMsg($message.fail(errMessage))
    } else {
      console.log(error);
      loading && loading.close()
      try {
        if (error.config && error.config.isReturnMsg) {
          console.log(error.message.indexOf("timeout"));
          if (error.message.indexOf("timeout") != -1) {
            return Promise.reject({
              message: "接口超时"
            });
          } else if (error.message.indexOf("Network Error") != -1) {
            return Promise.reject({
              message: "网络连接错误"
            });
          } else {
            return Promise.reject(error);
          }
        } else {
          if (error.message.indexOf("timeout") != -1) {
            $message("接口超时");
          } else if (error.message.indexOf("Network Error") != -1) {
            $message("网络连接错误");
          } else {
            $message(error.message);
          }
        }
      } catch (e) {}
    }
  }
);

export default function (url, data = {}, config = {}) {
  config.method = config.type === "get" ? "get" : "post";
  config.type = config.type ? config.type : "json";
  config.url = url;
  config.data = data;

  if (config.type.toUpperCase() === "EXPORT") {
    config.data.Authorization = store.get("userInfo") ?
      store.get("userInfo").token :
      "";
    const url = api + config.url;
    window.open(`${url}?${getParams(config.data)}`);
    httpLoading && httpLoading.clear();
    return false;
  } else {
    return instance(config);
  }
}

function name(a) {
  console.log(a);
}