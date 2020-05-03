'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstadosSchema extends Schema {
  up () {
    this.create('estados', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('estados')
  }
}

module.exports = EstadosSchema
