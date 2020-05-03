'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioInteressesSchema extends Schema {
  up () {
    this.create('usuario_interesses', (table) => {
      table
        .integer('usuario_id')
        .references('id')
        .inTable('usuarios')
        
      table
        .integer('interesse_id')
        .references('id')
        .inTable('interesses')
      table
        .unique(['usuario_id', 'interesse_id'])
      table
        .timestamp('deleted_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuario_interesses')
  }
}

module.exports = UsuarioInteressesSchema
