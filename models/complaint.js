const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ComplaintSchema = new mongoose.Schema(
    {
        user:{type: Schema.Types.String, ref: 'User'},

        // products:{ type: Schema.Types.ObjectID, ref: 'Product'},
        //

        ComplaintObject: { type: String,  },
        Description: { type: String,  },
        status: { type: String, default: "Not treated" },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
