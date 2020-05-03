'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoNetworkingSchema extends Schema {
  up () {
    this.create('tipo_networkings', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipo_networkings')
  }
}

module.exports = TipoNetworkingSchema
