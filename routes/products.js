var express = require('express');
var router = express.Router();
const productModel=require('../models/productModel');

//Listar
router.get('/', async function(req, res, next) {
 const resultado= await productModel.find(); 
  res.json(resultado);
});

//Agregar
router.post('/', async function(req, res, next) {
  let datos={
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    images: req.body.images
  }
  let product = new productModel(datos);
  let resultado = await product.save();
  res.send('Registro agregado exitosamente');
});

//Editar
router.put('/:id', async function(req, res, next) {
  const filter = {id: req.body.id}; //Condición de Query
  const update = {name: req.body.name,
                  price: req.body.price,
                  description: req.body.description,
                  stock: req.body.stock}; //Campos a modificar


  const resultado = await productModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });


  res.json("Se ha actualizado el producto");

});

//Eliminar
router.delete('/:id', async function(req, res, next) {
  const resul = await productModel.find({id: req.params.id}).exec();
  if (resul.length > 0) {
    await productModel.deleteOne({id: req.params.id});
    res.json("Se ha eliminado el producto");
  } else {
    res.json({error: "No se encontró el producto con ID: " + req.params.id})
  }
});

module.exports = router;
