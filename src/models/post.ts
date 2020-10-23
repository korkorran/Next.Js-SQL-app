import Knex from 'knex'
import {Post, PostWithAuthorInfo} from 'utils/types'

interface PostInterface {
  created_at : string | Date;
  updated_at : string | Date;
}

function translateDateInPost(post : PostInterface) {
  if(post.created_at instanceof Date){
    post.created_at = post.created_at.toLocaleString()
  }
  if(post.updated_at instanceof Date){
    post.updated_at = post.updated_at.toLocaleString()
  }
}

export default class PostModel {
  private knex : Knex

  constructor(knexInstance : Knex) {
    this.knex = knexInstance;
  }

  
  async listWithAuthor(author : number = null) : Promise<Array<PostWithAuthorInfo>> {
    const posts : PostWithAuthorInfo[] = await this.knex('post')
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
    return posts.map( post => {translateDateInPost(post); return post});
  }

  async oneWithAuthor(id : number) : Promise<PostWithAuthorInfo> {
    const post = await this.knex('post')
        .join('user', 'user.id', '=', 'post.author')
        .where('post.id', id)
        .select(
            'post.id', 
            'post.content', 
            'post.created_at', 
            'post.updated_at', 
            'post.author', 
            'user.username as author_username',
            'user.profilePictureURL as author_pictureURL'
        )
        .first()
    translateDateInPost(post);
    return post;
  }

  async insertPost(content : string, author : number) {
    const id = await this.knex.returning('id').insert({
      content: content,
      author : author
    }).into('post');
    return id[0];
  }

}
