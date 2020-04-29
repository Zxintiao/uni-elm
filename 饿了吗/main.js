import Vue from 'vue'
import App from './App'

//全局引入css样式
import "./assets/icon/iconfont.css"
import "./assets/css/commont.css"


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
