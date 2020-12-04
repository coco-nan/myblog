import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/bloglist',
  },
  {
    path: '/',
    name: 'home',
    component:()=>import("@/views/home.vue"),
    children:[
      {
        path:'/bloglist',
        name:'bloglist',
        component:()=>import("@/views/blogList.vue")
      },
      {
        path:'/blogsub',
        name:'blogsub',
        component:()=>import("@/views/blogSub.vue")
      },
      {
        path:'/tag',
        name:'tag',
        component:()=>import("@/views/tag.vue")
      },
      {
        path:'/sort',
        name:'sort',
        component:()=>import("@/views/sort.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) =>{
  if(to.path === '/login'){
    next()
  }else{
    const token = localStorage.getItem('token');
    if(token === null || token === ''){
      next('/login')
    }else{
      next();
    }
  }
})

export default router
