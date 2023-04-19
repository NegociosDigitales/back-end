var express = require('express');
var router = express.Router();
const clientModel=require('../models/clientModel');

//Listar
router.get('/', async function(req, res, next) {
 const resultado= await clientModel.find(); 
 res.json(resultado);
});

//Agregar
router.post('/', async function(req, res, next) {
  let datos={
    id: req.body.id,
    name: req.body.name,
    type: req.body.type
  }
  let cliente = new clientModel(datos);
  let resultado = await cliente.save();
  res.send('Registro agregado exitosamente');
});

//Editar
router.put('/:id', async function(req, res, next) {
  const filter = {id: req.body.id}; //Condición de Query
  const update = {name: req.body.name}; //Campos a modificar
  const resultado = await clientModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });
  res.json("Se ha actualizado el producto");
});

//Eliminar
router.delete('/:id', async function(req, res, next) {
  const resul = await clientModel.find({id: req.params.id}).exec();
  if (resul.length > 0) {
    await clientModel.deleteOne({id: req.params.id});
    res.json("Se ha eliminado el producto");
  } else {
    res.json({error: "No se encontró el producto con ID: " + req.params.id})
  }
});

module.exports = router;
