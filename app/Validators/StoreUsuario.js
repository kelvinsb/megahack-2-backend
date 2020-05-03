'use strict'

class StoreUsuario {
  get validateAll () {
    return true
}
  get rules () {
    return {
      nome: 'required|string',
      // sobrenome: 'required|string',
      email: 'required|email',
      cidade: 'required|string',
      tipos_usuarios_id: 'required|integer',
      // cidades_id: 'required|integer',
      senha: 'required'
    }
  }
	async fails(errorMessages) {
    const saidas = errorMessages.map(el => el.message)
		return this.ctx.response.json({ error: saidas });
	}
}

module.exports = StoreUsuario
