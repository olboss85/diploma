import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeViewPage.vue')
    },
    {
      path: '/travelReview',
      name: 'TravelReview',
      component: () => import('../views/TravelReviewPage.vue')
    },
    {
      path: '/findYourTrip',
      name: 'YourTrip',
      component: () => import('../components/YourTrip.vue')
    },
    {
      path: '/content/:id',
      name: 'content',
      component: () => import('../views/TripIdPage.vue')
    }
  ]
})

export default router
