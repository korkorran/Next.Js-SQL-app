import {Model} from 'objection'
import Knex from 'knex'
import Envs from '../../knexfile'

const knex = Knex(Envs.development)

Model.knex(knex)

class User extends Model {
  username: string;
  email:string;
  passwordHash: string;

  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'passwordHash'],

      properties: {
        username: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        passwordHash: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }
}

export async function main() {
  const john = await User.query().insert({
    username: 'John',
    email: 'john@test.fr',
    passwordHash: '1234'
  });
  User.query()
}

export async function list() {
  const users = await User.query();
  return users;
}