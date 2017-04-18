var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jugadorSchema = new Schema({
//Schema que define el jugador
	nombre: {type: String, required: [true, "campo requerido"]},
	piernaPreferida: {type: String, required: [true, "campo requerido"]},
	fechaNacimiento: String,
	
	ciudad: {type: Schema.Types.ObjectId, ref: 'ciudad'}

});
//se define la forma del objeto que entra en mongo
//el último parámetro se refiere a qué coleccion

var Jugador = mongoose.model("Jugador", jugadorSchema);

module.exports.Jugador = Jugador;