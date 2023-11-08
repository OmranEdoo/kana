import { createApp } from 'vue'

// vue-router
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/quizz', name: 'quizz', component: Quizz }
    ]
})

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

import './style.css'
import App from './App.vue'
import Home from './views/Home.vue'
import Quizz from './views/Quizz.vue'

createApp(App).use(router).use(vuetify).mount('#app')
