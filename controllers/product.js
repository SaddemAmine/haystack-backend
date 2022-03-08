const Product = require('../models/product');

exports.list = async (req, res, next) => {
    const products = await Product.find();
    await res.json({
        products
    });
};

exports.get = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const product = await Product.findById(req.params.id);
        if (!product) {
            await res.json({
                error: "product Not Found"
            });
        }
        else {
            await res.json({
                product
            });
        }
    }
};

exports.create = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        await res.json({product});
    } catch (error) {
        await res.json({
            error: "CONFLICT !"
        });
    }
};

exports.edit = async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.json({
                error: "Id Not Found"
            });
        }
        else {
            const product = new Product(req.body);
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
            await res.json({updatedProduct});
        }
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};

exports.remove = async (req, res, next) =>  {
    try {
        Product.deleteOne(req.params.id);
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};
