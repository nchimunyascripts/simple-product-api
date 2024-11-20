const Product = require("../models/product.model.js")
const redisClient = require('../redisClient');
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10} = req.query;
        const cacheKey = `products:${page}:${limit}`
        redisClient.get(cacheKey, async (err, cachedProducts) => {
            if (err) throw err;
            if (cachedProducts){
                return res.status(200).json(JSON.parse(cachedProducts))
            } else {
                const products = await Product.find({})
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec()
                const count = await Product.countDocuments()
                const response = {
                    products, 
                    totalPages: Math.ceil(count / limit),
                    currentPage: page
                }
                redisClient.setex(cacheKey, 60, JSON.stringify(response))
                return res.status(200).json(response)
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        redisClient.keys('Products:*', (err, response) => {
            if (err) throw err;
            if (key.length > 0) {
                redisClient.del(key, (err, response) => {
                    if (err) throw err;
                    console.log('Cached cleared');
                })
            }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product has been deleted"}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product){
            return res.status(200).json({message: "Product not found"})
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {getProducts, getProduct, createProduct, updateProduct, deleteProduct}
