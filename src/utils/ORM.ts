import UserORM from 'models/user'
import PostORM from 'models/post'
import Knex from 'knex'

export default class ORM {
    user : UserORM;
    post : PostORM;
    constructor(knexInstance : Knex) {
        this.user = new UserORM(knexInstance)
        this.post = new PostORM(knexInstance)
    }
}
