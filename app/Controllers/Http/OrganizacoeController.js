'use strict'

const Database = use('Database')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with organizacoes
 */
class OrganizacoeController {
  /**
   * Show a list of all organizacoes.
   * GET organizacoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new organizacoe.
   * GET organizacoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new organizacoe.
   * POST organizacoes
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
          cnpj = null,
          iniciais = null,
          usuario_admin: usuarioAdmin,
        },
      } = request;
      const usuarioNetworking = await Database
        .table('organizacoes')
        .insert({
          nome,
          cnpj,
          iniciais,
          usuario_admin: usuarioAdmin,
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        })
      return response.status(201).json({})
    } catch (err) {
      return response.status(404).json({})
  }
}

  /**
   * Display a single organizacoe.
   * GET organizacoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing organizacoe.
   * GET organizacoes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update organizacoe details.
   * PUT or PATCH organizacoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a organizacoe with id.
   * DELETE organizacoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrganizacoeController
