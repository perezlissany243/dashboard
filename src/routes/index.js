const express = require('express')
const { checkToken } = require('../middleware/check_token')
const router = express.Router()
const { createuser, getuser, getlogin, getEmployees, deleteEmployeeController } = require("../controllers/userConrtroller")
const { createProductController, getProductController } = require('../controllers/product')
router.get('/', async (req, res) => {
    if (req.session.login) {
        //get all employee 
        const productTypes = [
            { product: 'FACEBOOK', link: 'https://perezlissany.github.io/social/afafafafafaaffaf.html' },
            { product: 'ONLYFANS', link: 'https://perezlissany.github.io/social/afafafafafaaffaf.html' }, 
        { product: 'INSTAGRAM', link: '' }, { product: 'CARD', link: '' }]

        const employee = await getEmployees(req.session.user_id)
        let ids = (employee || []).map(p => p._id)
        ids.push(req.session.user_id)
        //card product
        const d = { type: 'card', user_ids: ids }
        const product = await getProductController(d)
        res.render('dashboard', { employee: employee, user: req.session.user, product, productTypes })
        console.log()
    } else {
        res.render('main')
    }

})

// router.get('/dashboard', async (req,res)=>{
//     const user_id =req.user_id

//     res.render('dashboard',employee)
// })

router.post("/createemployee", createuser)
router.get("/user", getuser)
router.get("/delete/:id", deleteEmployeeController)
router.post('/login', getlogin)
router.post("/product", createProductController)

module.exports = router