import Router from 'koa-router'
import { Controller } from './controllers'


const router = new Router()
const controller = new Controller()

router.post('/sign-up', controller.signUp)
router.post('/sign-in', controller.signIn)
router.delete('/logout', controller.signOut)
router.get('/profile', controller.profile)
router.get('/refresh-access-token', controller.refreshAccesstoken)


export default router
