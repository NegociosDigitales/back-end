var express = require('express');
var router = express.Router();
const userModel=require('../models/userModel');

//Listar
router.get('/', async function(req, res, next) {
 const resultado= await userModel.find(); 
  res.json(resultado);
});

//Agregar
router.post('/', async function(req, res, next) {
  let datos={
    user: req.body.user,
    name: req.body.name
  }
  let user = new userModel(datos);
  let resultado = await user.save();
  res.send('Registro agregado exitosamente');
});

//Editar
router.put('/', async function(req, res, next) {
  const filter = {user: req.query.user}; //Condición de Query
  const update = {password: req.query.password}; //Campos a modificar


  const resultado = await userModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });


  res.json("Se ha actualizado correctamente");

});

//Eliminar
router.delete('/:user', async function(req, res, next) {
  const resul = await userModel.find({user: req.params.user}).exec();
  if (resul.length > 0) {
    await userModel.deleteOne({user: req.params.user});
    res.json("Se ha eliminado correctamente");
  } else {
    res.json({error: "No se encontró el usuario " + req.params.user})
  }
});

module.exports = router;
