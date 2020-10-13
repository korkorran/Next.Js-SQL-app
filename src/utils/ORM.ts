import UserORM from '../models/user'
import Knex from 'knex'

export default class ORM {
    user : UserORM;
    constructor(knexInstance : Knex) {
        this.user = new UserORM(knexInstance)
    }
}
