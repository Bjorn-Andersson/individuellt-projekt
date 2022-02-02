import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import app from './App.vue'
import router from './router'
import store from './store'
import { registerSW } from 'virtual:pwa-register'
registerSW()

createApp(app).use(router).use(store).use(VueAxios, axios).mount('#app')
