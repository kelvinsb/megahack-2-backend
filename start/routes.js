'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('usuarios', 'UsuarioController')
  .only(['store'])
  .apiOnly()
  .validator(new Map([
    [['usuarios.store'], ['StoreUsuario']],
  ]))

Route.resource('tipos-usuarios', 'TiposUsuarioController')
  .only(['index'])
  .apiOnly()

Route.post('login', 'UsuarioController.login')

Route.get('interesses', 'InteresseController.index');
Route.get('interesses/:usuario_id', 'UsuarioInteressController.index');
Route.post('interesses/:usuario_id', 'UsuarioInteressController.store');
Route.get('tipo-networking', 'TipoNetworkingController.index');
Route.get('tipo-networking/:usuario_id', 'UsuarioTipoNetworkingController.index');
Route.post('tipo-networking/:usuario_id', 'UsuarioTipoNetworkingController.store');
Route.post('organizacoes', 'OrganizacoeController.store');
Route.post('eventos', 'EventoController.store');

Route.get('/', () => {
  return { greeting: 'Hello worl\d in JSON' }
})
