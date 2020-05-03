'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioTipoNetworkingSchema extends Schema {
  up () {
    this.create('usuario_tipo_networkings', (table) => {
      table
        .integer('usuario_id')
        .references('id')
        .inTable('usuarios')
        
      table
        .integer('tipo_networking_id')
        .references('id')
        .inTable('tipo_networkings')
      table
        .unique(['usuario_id', 'tipo_networking_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('usuario_tipo_networkings')
  }
}

module.exports = UsuarioTipoNetworkingSchema
