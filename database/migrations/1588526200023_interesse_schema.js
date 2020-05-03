'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InteresseSchema extends Schema {
  up () {
    this.create('interesses', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('interesses')
  }
}

module.exports = InteresseSchema
