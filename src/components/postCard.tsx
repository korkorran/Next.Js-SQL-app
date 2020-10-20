import Link from 'next/link'
import {PostWithAuthorInfo} from 'utils/types'

type PostCardProps = {
  post : PostWithAuthorInfo
}

const PostCard = ({post} : PostCardProps) => (
  <article className="media article">
    <figure className="media-left">
      <p className="image is-64x64">
        <img src='/undraw_male_avatar_323b.svg' />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{post.author_username}</strong> &ensp;
          <small>{post.created_at}</small>
          <br/>
          { post.content}
        </p>
      </div>
      <nav className="level is-mobile">
        <div className="level-left">
          <a className="level-item">
            <span className="icon is-small"><i className="fas fa-reply"></i></span>
          </a>
          <a className="level-item">
            <span className="icon is-small"><i className="fas fa-retweet"></i></span>
          </a>
          <a className="level-item">
            <span className="icon is-small"><i className="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
  </article>
)

export default PostCard
