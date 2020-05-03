'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permissoe extends Model {
    recurso () {
        return this.hasOne('App/models/Recurso', 'recursos_id', 'id')
    }
    tipoUsuario () {
        return this.hasOne('App/models/TipoUsuario', 'tipos_usuarios_id', 'id')
    }
}

module.exports = Permissoe
