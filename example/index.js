import Vue from 'vue'
import Router from 'vue-router'
import app from './app'

Vue.use(Router)

const router = new Router()
router.map({
	'/': {
		component: require('./views/home')
	}
})

router.start(app, 'app')
