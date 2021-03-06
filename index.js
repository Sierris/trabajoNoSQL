
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var expressValidator = require('express-validator'); //validador
mongoose.connect('localhost:27017/football'); //conexion con mongodb

var Jugador=require("./modelos/jugador").Jugador;
var Ciudad = require("./modelos/ciudad").Ciudad;
var Liga = require("./modelos/liga").Liga;
var Equipo = require("./modelos/equipo").Equipo;

var numeros="0123456789";

function isNumber(texto){
   for(i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0)!=-1){
         return 1;
      }
   }
   return 0;
}

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
		Jugador.find().populate("ciudad").then(function(doc) {
			//console.log(doc)
			res.render('jugador', {items: doc});
		});
	}else{
		Jugador.findOne({'nombre': buscar}).populate("ciudad").exec(function(err,jugador) {
			//console.log("Jugador " + jugador);
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
          if (isNumber(item.nombre == 1) && item.nombre != "") {
          	console.log("Nombre invalido");
          }
          else{
          	if (isNumber(item.piernaPreferida)) {
          		console.log("Pierna no valida");
          	}
          	else{
          		if(isNumber(item.ciudad) == 1 && item.ciudad != ""){
          			console.log("ciudad invalida");
          		}
          		else{
          			var data = new Jugador(item);
          			//console.log(item.ciudad);
          			data.save().then(function(us){
            		res.redirect("/jugador");
          			}); //guarda en la bd
          		}
          	}

          }
          
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

			name= req.body.nombre;
			leg = req.body.piernaPreferidaU;
			date = req.body.fechaNacimientoU;

			if (isNumber(name)==1) {
				console.log("Nombre invalido");
			}
			else{
				doc.nombre = name;
				if (leg.lowercase() != "derecha" && leg.lowercase() != "izquierda") {
					console.log("Pierna invalida");
				}
				else{
					doc.piernaPreferida = leg;
					doc.fechaNacimiento = date;
					doc.save();
					
				}
			}
			
		}
		res.redirect('/jugador');
	});
	
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
router.post('/get-dataC', function(req,res, ext){

	var buscar = req.body.buscarC;
	console.log("Buscar " + buscar);

	if(buscar == ""){
		Ciudad.find().then(function(doc) {
			//console.log(doc)
			res.render('ciudad', {items: doc});
		});
	}else{
		Ciudad.find({'ciudad': buscar}).exec(function(err,ciudad) {
			//console.log("Ciudad " + ciudad);
			res.render('ciudad', {items: ciudad});
		});
	}
});

router.post('/insertC', function(req, res, next) {

	var item = {
		pais: req.body.pais,
		depto: req.body.depto,
		ciudad: req.body.ciudad
	};
	if (isNumber(item.pais)==1 && pais != ""){
		console.log("Pais invalido");
	}
	else{
		if (isNumber(item.depto)==1 && depto != "") {
			console.log("Departamento invalido");
		}
		else{
			if (isNumber(item.ciudad)==1 && ciudad != "") {
				console.log("Ciudad invalida");
			}
			else{
				var data = new Ciudad(item);
				data.save(); //guarda en la bd
				res.redirect('/ciudad');
			}
		}
	}
});

router.post('/updateC', function(req, res, next) {

	var id = req.body.id;

	Ciudad.findById(id, function(err, doc){
		//console.log(doc);
		if(err){
			console.log('No se encontró el jugador');
		}else{

			country =req.body.paisU;
			dep = req.body.deptoU; 
			city = req.body.ciudadU;

			if (isNumber(country)==1){
				console.log("Pais invalido");
			}
			else{
				if (isNumber(dep)==1) {
					console.log("Departamento invalido");
				}
				else{
					if (isNumber(city)==1) {
						console.log("Ciudad invalida");
					}
					else{

						doc.Pais = country;
						doc.depto = dep;
						doc.ciudad = city;
						doc.save();
					}
				}
			}
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
router.post('/get-dataL', function(req,res, ext){

	var buscar = req.body.buscarL;
	//console.log("Buscar " + buscar);

	if(buscar == ""){
		Liga.find().then(function(doc) {
			//console.log(doc)
			res.render('liga', {items: doc});
		});
	}else{
		Liga.find({'nombre': buscar}).exec(function(err,liga) {
			console.log("Ciudad " + liga);
			res.render('liga', {items: liga});
		});
	}
});

router.post('/insertL', function(req, res, next) {

	var item = {
		nombre: req.body.nombreL,
		pais: req.body.paisL,
		
	};
	if (isNumber(item.nombre)==1 && nombre != "") {
		console.log("Nombre invalido");
	}
	else{
		if (isNumber(item.pais)==1 && pais != "") {
			console.log("Pais invalido");
		}
		else{
			var data = new Liga(item);
			data.save(); //guarda en la bd
			res.redirect('/liga');
		}
	}

});

router.post('/updateL', function(req, res, next) {

	var id = req.body.id;

	Liga.findById(id, function(err, doc){
		if(err){
			console.log(err)
		}else{

		name = req.body.nombreUL;
		country = req.body.paisUL;

		if (isNumber(nombre)==1) {
			console.log("Nombre invalido");
		}
		else{
			if (isNumber(pais)==1) {
				console.log("Pais invalido");
			}
			else{
				doc.nombre = req.body.nombreUL;
				doc.pais = req.body.paisUL;
				doc.save();
			}
		}

		
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
router.post('/get-dataE', function(req,res, ext){

	var buscar = req.body.buscarE;
	//console.log("Buscar " + buscar);

	if(buscar == ""){
		Equipo.find().populate("liga").then(function(doc) {
			//console.log(doc)
			res.render('equipo', {items: doc});
		});
	}else{
		Equipo.findOne({'nombre': buscar}).populate("liga").exec(function(err,equipo) {
			//console.log("Equipo " + equipo);
			res.render('equipo', {items: equipo});
		});
	}
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

          		if (isNumber(item.nombre)==1 && nombre != "") {
          			console.log("Nombre invalido");
          		}
          		else{
          			if (isNumber(item.liga)==1 && liga != "") {
          				console.log("Liga invalida");
          			}
          			else{
          				if (isNumber(item.estadio)==1 && estadio != "") {
          					console.log("Estadio invalido");
          				}
          				else{
          					var data = new Equipo(item);
          					data.save().then(function(us){
            				res.redirect("/equipo");
          					}); //guarda en la bd
          				}

          			}
          		}
          		//console.log(item);

          	
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

		name = req.body.nombreEU;
		ligue = req.body.ligaU;
		stad = req.body.estadioU;

		if (isNumber(name)==1 && nombre != "") {
          			console.log("Nombre invalido");
          		}
        else{
          	if (isNumber(ligue)==1 && liga != "") {
          		console.log("Liga invalida");
          	}
          	else{
          		if (isNumber(stad)==1 && estadio != "") {
          					console.log("Estadio invalido");
          		}
          		else{
          			doc.nombre = req.body.nombreEU;
					doc.liga = req.body.ligaU;
					doc.estadio = req.body.estadioU;
					doc.save();
          		}

          	}
        }


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
