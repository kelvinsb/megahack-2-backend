'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Recurso extends Model {
    permissoes () {
        return this.belongsToMany('App/models/Permissoe', 'id', 'recursos_id')
    }
}

module.exports = Recurso
