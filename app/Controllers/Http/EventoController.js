'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with eventos
 */
class EventoController {
  /**
   * Show a list of all eventos.
   * GET eventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new evento.
   * GET eventos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new evento.
   * POST eventos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const {
        body: {
          nome = null,
          descricao_simples: descricaoSimples = null,
          descricao_detalhada: descricaoDetalhada = null,
          data = null,
          valor = null,
          organizador_id: organizadorId,
        },
      } = request;
      const usuarioNetworking = await Database
        .table('organizacoes')
        .insert({
          nome,
          descricao_simples: descricaoSimples,
          descricao_detalhada: descricaoDetalhada,
          data,
          valor,
          organizador_id: organizadorId,
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        })
      return response.status(201).json({})
    } catch (err) {
      return response.status(404).json({})
  }

  /**
   * Display a single evento.
   * GET eventos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing evento.
   * GET eventos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update evento details.
   * PUT or PATCH eventos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a evento with id.
   * DELETE eventos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = EventoController
