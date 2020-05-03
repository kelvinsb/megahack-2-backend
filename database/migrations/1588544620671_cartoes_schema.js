'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartoesSchema extends Schema {
  up () {
    this.create('cartoes', (table) => {
      table.increments()
      table.string('ocupacao', 100)
      table.string('descricao', 100)
      table.string('telefone', 100)
      table.string('linkedin', 100)
      table.string('email', 100)
      table
        .integer('usuario_id')
        .references('id')
        .inTable('usuarios')
      table.timestamps()
    })
  }

  down () {
    this.drop('cartoes')
  }
}

module.exports = CartoesSchema
