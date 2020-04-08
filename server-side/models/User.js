const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        email: { type: String, require:true, unique:true},
        password: String,
        shippingAddress: String,
        productList: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
        favouriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
    },
    {
        timestamps: true
      }
    );
    
const User = mongoose.model('User', userSchema);

module.exports = User;


