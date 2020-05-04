'use strict'
var joinjs = require('join-js').default;
const Cartoes = use('App/Models/Cartoe')
const Database = use('Database')
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
    const query = await Database
      .table({
        cart: 'cartoes',
      })
        .select({
          id: 'cart.id',
          nome: 'usr.nome',
          usuario_id: 'usr.id',
          tipo_networking_id: 'tp.id',
          tipo_networking_nome: 'tp.nome',
          interesses_id: 'int.id',
          interesses_nome: 'int.nome',
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
        })
        .leftJoin({
          utn: 'usuario_tipo_networkings',
        }, 'usr.id', 'utn.usuario_id')
        .leftJoin({
          tp: 'tipo_networkings',
        }, 'tp.id', 'utn.tipo_networking_id')
        .leftJoin({
          ui: 'usuario_interesses',
        }, 'ui.usuario_id', 'usr.id')
        .leftJoin({
          int: 'interesses',
        }, 'int.id', 'ui.interesse_id')
        console.log(query)
        const resultMaps = [
          {
            mapId: 'mapa',
            idProperty: 'id',
            properties: ['nome', 'usuario_id', 'ocupacao', 'descricao', 'telefone', 'linkedin', 'email'],
            collections: [
              {
                name: 'interesses',
                mapId: 'interessesMap',
                columnPrefix: 'interesses_'
              },
              {
                name: 'tipo_networking',
                mapId: 'tipo_netowrkingMap',
                columnPrefix: 'tipo_networking_'
              },
            ]
          },
              {
                mapId: 'interessesMap',
                idProperty: 'id',
                properties: ['nome'],
              },
              {
                mapId: 'tipo_netowrkingMap',
                idProperty: 'id',
                properties: ['nome'],
              }
        ]
        const saida = joinjs.map(query, resultMaps, 'mapa', '');
      return response.status(200).json(saida)
    // const cartoes = Cartoes
    //   .query()
    //   .fetch()
    // return cartoes
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
    try {
      const {
        body: {
          ocupacao = null,
          descricao = null,
          telefone = null,
          linkedin = null,
          email = null,
          usuario_id: usuarioId = null,
        },
      } = request;
      const jaExiste = await Database
        .table('cartoes')
        .select(['id'])
        .where('usuario_id', usuarioId)
      if (jaExiste.length > 0) {
        return response.status(409).json({})
      }
      const tipo = await Database
        .table('cartoes')
        .insert({
          ocupacao,
          descricao,
          telefone,
          linkedin,
          email,
          usuario_id: usuarioId,
          created_at: Database.fn.now(),
          updated_at: Database.fn.now(),
        })
      return response.status(201).json({})
    } catch (err) {
      return response.status(404).json({})
  }
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
          id: 'cart.id',
          nome: 'usr.nome',
          usuario_id: 'usr.id',
          tipo_networking_id: 'tp.id',
          tipo_networking_nome: 'tp.nome',
          interesses_id: 'int.id',
          interesses_nome: 'int.nome',
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
          builder.on('usr.id', Database.raw(usuarioId))
        })
        .leftJoin({
          utn: 'usuario_tipo_networkings',
        }, 'usr.id', 'utn.usuario_id')
        .leftJoin({
          tp: 'tipo_networkings',
        }, 'tp.id', 'utn.tipo_networking_id')
        .leftJoin({
          ui: 'usuario_interesses',
        }, 'ui.usuario_id', 'usr.id')
        .leftJoin({
          int: 'interesses',
        }, 'int.id', 'ui.interesse_id')
        const resultMaps = [
          {
            mapId: 'mapa',
            idProperty: 'id',
            properties: ['nome', 'usuario_id', 'ocupacao', 'descricao', 'telefone', 'linkedin', 'email'],
            collections: [
              {
                name: 'interesses',
                mapId: 'interessesMap',
                columnPrefix: 'interesses_'
              },
              {
                name: 'tipo_networking',
                mapId: 'tipo_netowrkingMap',
                columnPrefix: 'tipo_networking_'
              },
            ]
          },
              {
                mapId: 'interessesMap',
                idProperty: 'id',
                properties: ['nome'],
              },
              {
                mapId: 'tipo_netowrkingMap',
                idProperty: 'id',
                properties: ['nome'],
              }
        ]
        const saida = joinjs.map(query, resultMaps, 'mapa', '');
      return response.status(200).json(saida)
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
