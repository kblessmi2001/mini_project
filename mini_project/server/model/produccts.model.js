const mongoose = require("mongoose");



const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    category: String,
    description: String,
    gender: String

},{
    versionKey:false
})

const PorductModel = mongoose.model("products",productSchema);



module.exports = {PorductModel};