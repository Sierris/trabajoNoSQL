
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var expressValidator = require('express-validator'); //validador
mongoose.connect('localhost:27017/football'); //conexion con mongodb

var Jugador=require("./modelos/jugador").Jugador;
var Ciudad = require("./modelos/ciudad").Ciudad;
var Liga = require("./modelos/liga").Liga;
var Equipo = require("./modelos/equipo").Equipo;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//render jugador
router.get('/jugador', function(req, res, next){
	res.render('jugador');
});

//CRUD jugador
router.post('/get-data', function(req,res, ext){

	var buscar = req.body.buscarJ;
	console.log("Buscar " + buscar);

	if(buscar == ""){
		Jugador.find().then(function(doc) {
			console.log(doc)
			res.render('jugador', {items: doc});
		});
	}else{
		Jugador.findOne({'nombre': buscar}).exec(function(err,jugador) {
			console.log("Jugador " + jugador);
			res.render('jugador', {items: jugador});
		});
	}
});

router.post('/insert', function(req, res, next) {

	var busqueda = req.body.ciudadJ;

  Ciudad.findOne({'ciudad': busqueda}).exec(function(err,ciudad){
     if(err){
       console.log(err);
     }else{
       if(ciudad != null){
        // console.log(ciudad._id);

         var item = {
       		nombre: req.body.nombreJugador,
       		piernaPreferida: req.body.piernaPreferida,
       		fechaNacimiento: req.body.fechaNacimiento,
          	ciudad:ciudad._id
          }
          var data = new Jugador(item);
          console.log(item.ciudad);
          data.save().then(function(us){
            res.redirect("/jugador");
          }); //guarda en la bd
       }else{
         console.log("Ciudad is null");
       }
     }
   })

	res.redirect('/jugador');
});

router.post('/update', function(req, res, next) {

	var id = req.body.id;

	Jugador.findById(id, function(err, doc){
		//console.log(doc.nombre);
		if(err){
			console.log('No se encontró el jugador');
		}else{

			doc.nombre = req.body.nombre;
			doc.piernaPreferida = req.body.piernaPreferidaU;
			doc.fechaNacimiento = req.body.fechaNacimientoU;
			doc.save();
		}
	});
	res.redirect('/jugador');
});

router.post('/delete', function(req, res, next) {
	var id = req.body.id;
	Jugador.findByIdAndRemove(id).exec();

	res.redirect('/jugador');
});

router.get('/ciudad', function(req, res, next){
	res.render('ciudad');
});

//CRUD ciudad
router.get('/get-dataC', function(req,res, ext){
	Ciudad.find().then(function(doc) {
		res.render('ciudad', {items: doc});
	});
});

router.post('/insertC', function(req, res, next) {

	var item = {
		pais: req.body.pais,
		depto: req.body.depto,
		ciudad: req.body.ciudad
	};
	var data = new Ciudad(item);
	data.save(); //guarda en la bd

	res.redirect('/ciudad');
});

router.post('/updateC', function(req, res, next) {

	var id = req.body.id;

	Ciudad.findById(id, function(err, doc){
		//console.log(doc);
		if(err){
			console.log('No se encontró el jugador');
		}else{

			doc.Pais = req.body.paisU;
			doc.depto = req.body.deptoU;
			doc.ciudad = req.body.ciudadU;
			doc.save();
		}
	});
	res.redirect('/ciudad');
});

router.post('/deleteC', function(req, res, next) {
	var id = req.body.id;
	Ciudad.findByIdAndRemove(id).exec();

	res.redirect('/ciudad');
});

//render ligas
router.get('/liga', function(req, res, next){
	res.render('liga');
});

//CRUD liga
router.get('/get-dataL', function(req,res, ext){
	Liga.find().then(function(doc) {
		res.render('liga', {items: doc});
	});
});

router.post('/insertL', function(req, res, next) {

	var item = {
		nombre: req.body.nombreL,
		pais: req.body.paisL,
		
	};
	var data = new Liga(item);
	data.save(); //guarda en la bd

	res.redirect('/liga');
});

router.post('/updateL', function(req, res, next) {

	var id = req.body.id;

	Liga.findById(id, function(err, doc){
		if(err){
			console.log(err)
		}else{

		doc.nombre = req.body.nombreUL;
		doc.pais = req.body.paisUL;
		doc.save();
		}	
	});

	res.redirect('/liga');

});

router.post('/deleteL', function(req, res, next) {
	var id = req.body.id;
	Liga.findByIdAndRemove(id).exec();

	res.redirect('/liga');
});

//render equipo
router.get('/equipo', function(req, res, next){
	res.render('equipo');
});

//CRUD equipo
router.get('/get-dataE', function(req,res, ext){
	Equipo.find().then(function(doc) {
		res.render('equipo', {items: doc});
	});
});

router.post('/insertE', function(req, res, next) {

	var busqueda = req.body.liga;

 	 Liga.findOne({'nombre': busqueda}).exec(function(err,liga){
 
    	if(err){
       		console.log(err);
     	}else{
       		if(liga != null){
         		//console.log(liga._id);

         		var item = {
       				nombre: req.body.nombreE,
       				liga: liga._id,
       				estadio: req.body.estadio
          		};

          		//console.log(item);

          	var data = new Equipo(item);
          	data.save().then(function(us){
            	res.redirect("/equipo");
          	}); //guarda en la bd
        }else{
         console.log("Ciudad is null");
       }
     }
   })
});

router.post('/updateE', function(req, res, next) {

	var id = req.body.id;

	Equipo.findById(id, function(err, doc){
		//console.log(doc);
		if(err){
			console.log('No entry found');
		}else{
		doc.nombre = req.body.nombreEU;
		doc.liga = req.body.ligaU;
		doc.estadio = req.body.estadioU;
		doc.save();
		}
	});
	res.redirect('/equipo');
});

router.post('/deleteE', function(req, res, next) {
	var id = req.body.id;
	Equipo.findByIdAndRemove(id).exec();

	res.redirect('/equipo');
});

module.exports = router;
