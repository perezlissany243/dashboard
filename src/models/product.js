const Product = require("./schema/product")


const createProduct =(data)=>{
    const prod =new Product(data)
    prod.save()


}

const getProduct = async(p)=>{
    //
    const prod =await Product.find({"user_id":{ "$in": p.user_ids }})
    return prod;

}






module.exports ={
    createProduct,
    getProduct
}