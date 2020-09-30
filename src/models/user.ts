import Knex from 'knex'
import Envs from '../../knexfile'

const knex = Knex(Envs.development)

export async function list() {
  const users = await knex.select().from('user')
  return users;
}


export async function main() {
  const john = await knex.insert({
    username: 'John',
    email: 'john@test.fr',
    passwordHash: '123'
  }).into('user');
}

