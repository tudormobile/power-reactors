import { createRouter, createWebHistory } from 'vue-router'
import Plants from '@/components/Plants.vue';
import News from '@/components/News.vue';
import About from '@/components/About.vue';

const routes = [
  { path: '/', component: Plants },
  { path: '/plants', component: Plants },
  { path: '/news/', component: News },
  { path: '/about', component: About },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
