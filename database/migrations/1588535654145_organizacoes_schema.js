'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizacoesSchema extends Schema {
  up () {
    this.create('organizacoes', (table) => {
      table.increments()
      table.string('nome', 100)
        .notNullable()
      table.string('cnpj', 100)
        .notNullable()
      table.string('iniciais', 100)
        .notNullable()
      table
        .integer('usuario_admin')
        .references('id')
        .inTable('usuarios')
      table.timestamps()
    })
  }

  down () {
    this.drop('organizacoes')
  }
}

module.exports = OrganizacoesSchema
