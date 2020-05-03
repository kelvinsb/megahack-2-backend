'use strict'
const Usuarios = use('App/Models/Usuario')
const TiposUsuarios = use('App/Models/TiposUsuario')
const Permissoes = use('App/Models/Permissoe')
const Recursos = use('App/Models/Recurso')
const Database = use('Database')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuarios
 */
class UsuarioController {
  /**
   * Show a list of all usuarios.
   * GET usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // const usuarios = Usuarios.all()
    const usuarios = Usuarios
      .query()
      .setHidden(['senha'])
      .fetch()
    return usuarios
  }

  /**
   * Render a form to be used for creating a new usuario.
   * GET usuarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new usuario.
   * POST usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const dados = request.only([
        'nome',
        'sobrenome',
        'email',
        // 'cidades_id',
        'cidade',
        'senha',
        'tipos_usuarios_id',
      ])
      const usuarioExiste = await Usuarios.findBy('email', dados.email)
      const existeTipoUsuario = await TiposUsuarios.find(dados.tipos_usuarios_id)
  
      if (usuarioExiste) {
        return response
          .status(400)
          .json({
            erro: 'Usuario ja registrado'
          })
      }
      // admin
      if (!existeTipoUsuario || dados.tipos_usuarios_id === 4) {
        return response
          .status(400)
          .json({
            erro: 'Tipo de usuario nao existe'
          })
      }
      const usuario = await Usuarios.create(dados)
    } catch (err) {
      return response
        .status(err.status)
        .json(err)
    }
  }

  /**
   * Display a single usuario.
   * GET usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const usuarios = await Usuarios.findOrFail(params.id)
    return usuarios
  }

  /**
   * Render a form to update an existing usuario.
   * GET usuarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usuario details.
   * PUT or PATCH usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a usuario with id.
   * DELETE usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async login ({ params, request, response, auth }) {
    try {
      const {
        email,
        senha
      } = request.all();
      const usuario = await Database
        .table({
          usr: 'usuarios',
        })
        .where('usr.email', email)
        .first()
      const recursos = await Database
        .table({
          p: 'permissoes',
        })
        .select({
          recurso: 'r.nome',
        })
        .innerJoin({
          r: 'recursos'
        }, 'r.id', 'p.recursos_id')
        .innerJoin({
          tu: 'tipos_usuarios',
        }, builder => {
          builder.on('tu.id', 'p.tipos_usuarios_id')
        })
        .innerJoin({
          usr: 'usuarios',
        }, 'usr.tipos_usuarios_id', 'tu.id')
      const recursosObj = recursos.map(el => el.recurso)
      const payload = {
        tipo_usuario: usuario.nome,
        recursos: [
          ...recursosObj
        ]
      }
      const token = await auth.attempt(email, senha, payload)
      return response.status(201).json(token);
    } catch (err) {
      return response.status(500).json({...err})
    }
  }
}

module.exports = UsuarioController
