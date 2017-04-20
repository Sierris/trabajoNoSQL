var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipoSchema = new Schema({
//Schema que define el jugador
	nombre: {type: String, required: [true, "campo requerido"]},
	liga: {type: Schema.Types.ObjectId, ref: 'Liga'},
	estadio: String,
	
});
//se define la forma del objeto que entra en mongo
//el último parámetro se refiere a qué coleccion

var Equipo = mongoose.model("Equipo", equipoSchema);

module.exports.Equipo = Equipo;