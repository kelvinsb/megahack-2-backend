'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
      table.string('sobrenome', 100)
      table.string('email', 100)
      .notNullable()
      .unique()
      table.string('senha', 60).notNullable()
      table
        .string('cidade', 100)
        .notNullable()
      // table
      //   .integer('cidades_id')
      //   .references('id')
      //   .inTable('cidades')
      table
        .integer('tipos_usuarios_id')
        .references('id')
        .inTable('tipos_usuarios')
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
