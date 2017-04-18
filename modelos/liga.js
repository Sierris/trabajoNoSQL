var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ligaSchema = new Schema({
//Schema que define la ciudad
	nombre: {type: String, required: [true, "Nombre requerido"]},
	pais: {type: String, required: [true, "Pais requerido"]},
	
}, {collection: "liga"});

var Liga = mongoose.model("Liga", ligaSchema);

module.exports.Liga = Liga;