const router = require('koa-router')()

const Tag = require('../controllers/tag')
const Star = require('../controllers/star')
const Admin = require('../controllers/admin')
const Category = require('../controllers/category')
const Article = require('../controllers/article')
const jwtMiddleware = require('../middlewares/jwt')


// login
router.post('/login', Admin.loginIn)
router.post('/logout', Admin.logout)
router.post('/register', Admin.register)

// tag
router.get('/tag/list', Tag.list)
router.get('/tag/list/all', Tag.listAll)

router.post('/tag/create', Tag.create)
router.post('/tag/destroy', Tag.destroy)

// star
router.get('/star/list', Star.list)

router.post('/star/create', Star.create)
router.post('/star/destroy', Star.destroy)

// category
router.get('/category/list', Category.list)
router.get('/category/list/all', Category.listAll)

router.post('/category/create', Category.create)
router.post('/category/destroy', Category.destroy)

// Article
router.get('/article/list', Article.list)
router.get('/article/list/all', Article.listAll)
router.get('/article/item', Article.item)
router.get('/article/detail', Article.detail)

router.post('/article/create', Article.create)
router.post('/article/update', Article.update)
router.post('/article/destroy', Article.destroy)

// router.use(jwtMiddleware)

module.exports = router
