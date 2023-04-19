const mongoose= require('mongoose');
const clientSchema= new mongoose.Schema({
    id: Number,
    name: {type: String , required: true},
    type: {type: String, required: true}
});

module.exports=mongoose.model('Cliente', clientSchema);
