import { createApp } from 'vue'
import App from './App.vue'
import './assets/style/global.css'

import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'; // 引入Element Plus的样式

const app = createApp(App)

// 使用Element Plus
app.use(ElementPlus)

// 将ElMessage添加到全局属性
app.config.globalProperties.$message = ElMessage

app.mount('#app')
