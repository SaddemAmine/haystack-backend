const Product = require('../models/product');
const User = require('../models/user');

exports.list = async (req, res, next) => {
    const products = await Product.find();
    await res.json({
        products
    });
};

exports.getByUser = async (req, res, next) => {
    const products = await Product.find({owner: req.params.id});
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

exports.getMyProducts = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const user = await User.findById(req.userId);
        if (!user) {
            res.json({
                error: "User Not Found"
            });
        } else {
            const products = await Product.find({owner: user._id.toString()});
            await res.json({
                products
            });
        }
    }
};

exports.create = async (req, res) => {
    if (!req.isAuth) {
        console.log("NO AUTH")
        await res.json({
            error: "Not Auth"
        });
    }
    else {
        try {
            console.log("HEERE")
            const product = new Product(req.body);
            console.log(product)
            product.owner = req.userId;
            await product.save();
            const user = await User.findById(req.userId);
            await user.products.push(product._id);
            await user.save();
            await res.json({product});
        } catch (error) {
            console.log(error.message);
            await res.json({
                error: error.message
            });
        }
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
            if (product.stock != 1 )
                await res.json("CONFLICT");
            else {
                product._id = req.params.id;
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product, {new: true});
                await res.json({updatedProduct});
            }
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
        const product = await Product.findById(req.params.id);
        if (product.stock != 1 )
            await res.json("CONFLICT");
        else {
            await Product.findByIdAndDelete(req.params.id);
            await res.status(200).json("Product deleted");
        }
    } catch (error) {
        console.log(error.message);
        await res.json({
            error: error.message
        });
    }
};
