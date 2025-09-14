import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import './assets/vuetify/theme.scss' // 커스텀 테마 SCSS 파일
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Icons
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light' // SCSS에서 모든 색상이 정의됨
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
