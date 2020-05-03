'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cartoes
 */
class CartoeController {
  /**
   * Show a list of all cartoes.
   * GET cartoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new cartoe.
   * GET cartoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cartoe.
   * POST cartoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single cartoe.
   * GET cartoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const {
      usuario_id: usuarioId,
    } = request.params;
    const query = await Database
      .table({
        cart: 'cartoes',
      })
        .select({
          ocupacao: 'cart.ocupacao',
          descricao: 'cart.descricao',
          telefone: 'cart.telefone',
          linkedin: 'cart.linkedin',
          email: 'cart.email',
        })
        .innerJoin({
          usr: 'usuarios',
        }, builder => {
          builder.on('cart.usuario_id', 'usr.id')
          builder.on('usr.id', usuarioId)
        })
      return response.status(200).json(query.first())
  }

  /**
   * Render a form to update an existing cartoe.
   * GET cartoes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update cartoe details.
   * PUT or PATCH cartoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a cartoe with id.
   * DELETE cartoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CartoeController
