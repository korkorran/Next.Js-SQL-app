import Knex from 'knex'
import Envs, { development } from '../../knexfile'
import {User} from '../utils/types'
import bcrypt from 'bcrypt'

function translateDateInUser(user : User) {
  let newUser = user;
  if(user.created_at instanceof Date){
    newUser.created_at = user.created_at.toLocaleString()
  }
  if(user.updated_at instanceof Date){
    newUser.updated_at = user.updated_at.toLocaleString()
  }
  return newUser
}

export default class UserModel {
  private knex : Knex

  constructor(knexInstance : Knex) {
    this.knex = knexInstance;
  }

  
  async list() : Promise<Array<User>> {
    const users = await this.knex.select().from('user')
    return users;
  }

  async registerUser(username : string, email : string, password : string) {
    const hash = await bcrypt.hash(password, 10)
    const id = await this.knex.returning('id').insert({
      username: username,
      email: email,
      passwordHash: hash,
      isEmailConfirmed : false
    }).into('user');
    return id[0];
  }

  async userInfoIfPassWordValid(email : string, password : string){
    const user = await this.knex<User>('user').select().where({email : email}).first()
    const match = await bcrypt.compare(password, user.passwordHash)
    if ( match) {
      delete(user.passwordHash)
      return translateDateInUser(user)
    }
    else {
      return null
    }
  }

  async isPassWordValid(id : number, password){
    const user = await this.knex<User>('user').select().where({id : id}).first()
    const match = await bcrypt.compare(password, user.passwordHash)
    return ( match )
  }


  async userInfo(id : number){
    let user = await this.knex<User>('user').select().where({id : id}).first()
    return translateDateInUser(user)
  }

  async userInfoFromUsername(username : string){
    const user = await this.knex<User>('user').select().where({username : username}).first()
    return translateDateInUser(user)
  }

  async updatePassword(id : number, password : string){
    const hash = await bcrypt.hash(password, 10)
    await this.knex<User>('user').where({id : id}).update({passwordHash: hash})
  }

  async emailExists(email : string){
    const user = await this.knex<User>('user').select().where({email : email}).first()
    console.log(user)
    return (user != null)
  }

  async usernameExists(username : string){
    const user = await this.knex<User>('user').select().where({username : username}).first()
    return (user != null)
  }

  async updateBio(id : number, bio : string){
    await this.knex<User>('user').where({id : id}).update({bio: bio})
  }

}
