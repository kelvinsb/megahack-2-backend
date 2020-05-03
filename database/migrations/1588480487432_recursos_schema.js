'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RecursosSchema extends Schema {
  up () {
    this.create('recursos', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('recursos')
  }
}

module.exports = RecursosSchema
