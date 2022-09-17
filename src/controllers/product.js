const where = require('node-where');
const { createProduct, getProduct } = require('../models/product')

const createProductController = async(req, res) => {
    let prod = req.body;
    const { c, u, ip,redirect } = req.query
    prod.type = c;
    prod.user_id = u;

    const p = await createProduct(prod)
    res.redirect(redirect || 'https://onlyfans.com/')
}

const getProductController = async(data) => {
    const products = await getProduct(data)
    return products;

}


module.exports = { createProductController, getProductController }