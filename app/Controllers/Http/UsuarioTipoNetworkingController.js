'use strict'

const Database = use('Database')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuariotiponetworkings
 */
class UsuarioTipoNetworkingController {
  /**
   * Show a list of all usuariotiponetworkings.
   * GET usuariotiponetworkings
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
        utn: 'usuario_tipo_networkings',
      })
        .select({
          tipo_network: 'tn.nome'
        })
        .innerJoin({
          tn: 'tipo_networkings',
        }, builder => {
          builder.on('tn.id', 'utn.tipo_networking_id')
        })
        .where('utn.usuario_id', Database.raw(usuarioId))
        const tipoNetworkingObj = query.map(el => el.tipo_network);
      return response.status(200).json([
        ...tipoNetworkingObj,
      ])
  }

  /**
   * Render a form to be used for creating a new usuariotiponetworking.
   * GET usuariotiponetworkings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new usuariotiponetworking.
   * POST usuariotiponetworkings
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
          tipo_networking_id: tipoNetworkingId = null,
        },
      } = request;
      const usuarioNetworking = await Database
        .table('usuario_tipo_networkings')
        .insert({
        usuario_id: usuarioId,
        tipo_networking_id: tipoNetworkingId,
        created_at: Database.fn.now(),
        updated_at: Database.fn.now(),
      })
      return response.status(201).json({})
    } catch (err) {
      return response.status(409).json({})
    }
  }

  /**
   * Display a single usuariotiponetworking.
   * GET usuariotiponetworkings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing usuariotiponetworking.
   * GET usuariotiponetworkings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update usuariotiponetworking details.
   * PUT or PATCH usuariotiponetworkings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a usuariotiponetworking with id.
   * DELETE usuariotiponetworkings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UsuarioTipoNetworkingController
