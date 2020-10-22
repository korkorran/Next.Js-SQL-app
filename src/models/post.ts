import Knex from 'knex'
import {Post, PostWithAuthorInfo} from 'utils/types'

function translateDateInPost(post : Post) {
  let newPost = post;
  if(post.created_at instanceof Date){
    newPost.created_at = post.created_at.toLocaleString()
  }
  if(post.updated_at instanceof Date){
    newPost.updated_at = post.updated_at.toLocaleString()
  }
  return newPost
}

export default class PostModel {
  private knex : Knex

  constructor(knexInstance : Knex) {
    this.knex = knexInstance;
  }

  
  async listWithAuthor(author : number = null) : Promise<Array<Post>> {
    const posts = await this.knex('post')
        .join('user', 'user.id', '=', 'post.author')
        .where(builder => {
          if(author) {
            builder.where('user.id', author)
          }
        })
        .orderBy('post.created_at', 'desc')
        .select(
            'post.id', 
            'post.content', 
            'post.created_at', 
            'post.updated_at', 
            'post.author', 
            'user.username as author_username',
            'user.profilePictureURL as author_pictureURL'
        )
    return posts.map( post => translateDateInPost(post));
  }

  async insertPost(content : string, author : number) {
    const id = await this.knex.returning('id').insert({
      content: content,
      author : author
    }).into('post');
    return id[0];
  }

}
