'use strict'

const Database = use('Database')
const UsuarioInteresse = use('App/Models/UsuarioInteress')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuariointeresses
 */
class UsuarioInteressController {
  /**
   * Show a list of all usuariointeresses.
   * GET usuariointeresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {
      usuario_id: usuarioId,
    } = request.params;
    const query = await Database
      .table({
        ui: 'usuario_interesses',
      })
        .select({
          interesse: 'inter.nome'
        })
        .innerJoin({
          inter: 'interesses',
        }, builder => {
          builder.on('inter.id', 'ui.interesse_id')
        })
        .where('ui.usuario_id', Database.raw(usuarioId))
        const interesseObj = query.map(el => el.interesse);
      return response.status(200).json([
        ...interesseObj,
      ])
      
  }

  /**
   * Render a form to be used for creating a new usuariointeress.
   * GET usuariointeresses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new usuariointeress.
   * POST usuariointeresses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const {
        params: {
          usuario_id: usuarioId,
        },
        body: {
          interesse_id: interesseId = null,
        },
      } = request;
      const usuarioInteresse = await Database
        .table('usuario_interesses')
        .insert({
        usuario_id: usuarioId,
        interesse_id: interesseId,
        created_at: Database.fn.now(),
        updated_at: Database.fn.now(),
      })
      return response.status(201).json({})
    } catch (err) {
      return response.status(409).json({})
    }
  }

  /**
   * Display a single usuariointeress.
   * GET usuariointeresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing usuariointeress.
   * GET usuariointeresses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usuariointeress details.
   * PUT or PATCH usuariointeresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a usuariointeress with id.
   * DELETE usuariointeresses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UsuarioInteressController
