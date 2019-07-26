import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/LogIn.vue'
import Profile from './views/Profile.vue'
import Upload from './views/Upload.vue'
import Detail from './views/Detail.vue'
import File from './views/File.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/file/:uid/:fileid',
      name: 'file',
      component: File
    }
  ]
})
