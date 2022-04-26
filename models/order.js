const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new mongoose.Schema(
    {
        user:{type: Schema.Types.ObjectID, ref: 'User'},
        products: [
            {
                product: {
                    type: String,
                }
            },
        ],
        email: {type: String},
        amount: { type: Number,  },
        address: { type: Object,  },
        status: { type: Boolean,default: false},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
