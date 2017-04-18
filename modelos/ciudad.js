var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ciudadSchema = new Schema({
//Schema que define la ciudad
	pais: {type: String, required: [true, "Pais requerido"]},
	depto: {type: String, required: [true, "Departamento requerido"]},
	ciudad: {type: String, required: [true, "Ciudad requerida"]}

}, {collection: "ciudad"});

var Ciudad = mongoose.model("Ciudad", ciudadSchema);

module.exports.Ciudad = Ciudad;