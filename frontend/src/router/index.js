import Vue from 'vue'
import VueRouter from 'vue-router'
import Connection from '../views/Connection.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
		path: '/',
		redirect: '/login',
		name: 'Connection',
		component: Connection
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import('../views/Signup.vue')
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('../views/Home.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/modify-post/:id',
		name: 'Modify-Post',
		component: () => import('../views/Modify-Post.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/team',
		name: 'Team',
		component: () => import('../views/Team.vue'),
		meta: { requiresAuth: true }
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
		meta: { requiresAuth: true }
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* vérifions si l'user est connecté en appelant le state.user (depuis le store) sinon on redirige vers /login */
router.beforeEach((to, from, next) => {
	const isLogged = store.state.isLogged
	if ((to.name !== 'Login' && !isLogged) && (to.name !== 'Signup' && !isLogged)) next({ name: 'Login' })
	else next()
})

export default router
