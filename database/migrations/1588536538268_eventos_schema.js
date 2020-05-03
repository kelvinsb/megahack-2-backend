'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventosSchema extends Schema {
  up () {
    this.create('eventos', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
        table.string('descricao_simples', 100)
          .notNullable()
        table.string('descricao_detalhada', 400)
          .notNullable()
        table
          .timestamp('data')
        table
          .double('valor')
        table
          .integer('organizador_id')
          .references('id')
          .inTable('usuarios')
      table.timestamps()
    })
  }

  down () {
    this.drop('eventos')
  }
}

module.exports = EventosSchema
