import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Alert from '@/components/modules/alert'

import '@/common/vee-validate'

const app = createApp(App)

app.use(Alert)

app.use(store)
app.use(router)

app.mount('#app')
