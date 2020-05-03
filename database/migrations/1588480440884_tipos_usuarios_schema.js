'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TiposUsuariosSchema extends Schema {
  up () {
    this.create('tipos_usuarios', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipos_usuarios')
  }
}

module.exports = TiposUsuariosSchema
