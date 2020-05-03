'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cidade extends Model {
    estado() {
        return this.hasOne('App/Models/Estado')
    }
}

module.exports = Cidade
