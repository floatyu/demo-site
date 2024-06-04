import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css/normalize.css'
import ElementPlus from 'Element-Plus'
import i18n from './i18n'
import './mock'
import CmTable from './layout/components/CmTable.vue'


const app=createApp(App)
// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // Element Plus 图标在模板中需要使用 kebab-case
  const kebabCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
  app.component(kebabCaseKey, component);
}
app.component(CmTable.name,CmTable)
app.use(router).use(store).mount('#app')
app.use(ElementPlus)
app.use(i18n)


