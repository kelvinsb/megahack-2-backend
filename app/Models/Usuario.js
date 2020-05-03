'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Usuario extends Model {
    static boot () {
      super.boot()
  
      /**
       * A hook to hash the user password before saving
       * it to the database.
       */
      this.addHook('beforeSave', async (userInstance) => {
        if (userInstance.dirty.senha) {
          userInstance.senha = await Hash.make(userInstance.senha)
        }
      })
    }
  
    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens () {
      return this.hasMany('App/Models/Token')
    }
    tipoUsuario () {
      return this.hasOne('App/models/TiposUsuario', 'tipos_usuarios_id', 'id')
    }

}

module.exports = Usuario
