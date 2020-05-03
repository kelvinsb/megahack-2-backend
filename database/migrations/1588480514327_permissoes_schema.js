'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissoesSchema extends Schema {
  up () {
    this.create('permissoes', (table) => {
      table
        .integer('recursos_id')
        .references('id')
        .inTable('recursos')
        table
          .integer('tipos_usuarios_id')
          .references('id')
          .inTable('tipos_usuarios')
      table.timestamps()
    })
  }

  down () {
    this.drop('permissoes')
  }
}

module.exports = PermissoesSchema
