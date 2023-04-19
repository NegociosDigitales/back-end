const mongoose= require('mongoose');
const productSchema= new mongoose.Schema({
    id: Number,
    name: {type: String , required: true},
    price: {type: Number, min:0},
    description: {type: String , required: true},
    stock: Number,
    images:[String]
});

module.exports=mongoose.model('Producto', productSchema);
