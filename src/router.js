import { createRouter, createWebHashHistory } from 'vue-router'

import home from './pages/HomePage.vue'
import fight from './pages/FightPage.vue'
import challenge from './pages/ChallengePage.vue'
import pokemonInformation from './pages/InformationPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: home,
      path: '/'
    },
    {
      component: fight,
      path: '/fight'
    },
    {
      component: challenge,
      path: '/challenge'
    },
    {
      component: pokemonInformation,
      path: '/:name'
    }
  ]
})
