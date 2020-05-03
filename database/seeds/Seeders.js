'use strict'

const Estados = use('App/Models/Estado')
const Cidades = use('App/Models/Cidade')
const Usuarios = use('App/Models/Usuario')
const TipoUsuario = use('App/Models/TiposUsuario')
const Interesses = use('App/Models/Interesse')
const TipoNetworking = use('App/Models/TipoNetworking')
// const Permissoes = use('App/Models/Permissoe')
// const Recursos = use('App/Models/Recurso')

/*
|--------------------------------------------------------------------------
| CidadeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const tiposUsuarios = ['organizador', 'participante', 'patrocinador', 'admin']
const interesses = ['UX/UI', 'Frontend', 'Backend', 'Marketing', 'Business'];
const tipoNetworking = ['Empreendedor', 'Trabalho']
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CidadeSeeder {
  async run () {
    // await Cidades.truncate()
    // await Estados.truncate()

    // const estados = new Estados()
    // estados.nome = 'Parana'
    // await estados.save()

    // const estado = await Estados.query().where('nome', 'Parana').first()
    // const cidades = new Cidades()
    // cidades.nome = 'Curitiba'
    // cidades.estados_id = estado.id
    // await cidades.save()

    const tipos = tiposUsuarios.map(el => TipoUsuario.create({ nome: el }))
    await Promise.all([...tipos])
    const usuarioAdmin = await TipoUsuario.query().where('nome', 'admin').first()

    const interessesLista = interesses.map(el => Interesses.create({ nome: el }))
    await Promise.all([...interessesLista])

    const tipoNetworkingLista = tipoNetworking.map(el => TipoNetworking.create({ nome: el}))
    await Promise.all([...tipoNetworkingLista])

    // const primeiraCidade = await Cidades.query().where('nome', 'Curitiba').first()
    const usuario = await Usuarios.create({
      nome: "Admin",
      sobrenome: "Admin",
      email: "admin@tarrafa.com.br",
      senha:'123456',
      cidade: 'Curitiba',
      // cidades_id: primeiraCidade.id,
      tipos_usuarios_id: usuarioAdmin.id,
    })

  }
}

module.exports = CidadeSeeder
