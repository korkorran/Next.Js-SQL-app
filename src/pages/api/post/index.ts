import { NextApiResponse } from 'next'
import {PostIndexResponse, ApiRequest, Post} from 'utils/types'
import connectionHandler from 'utils/connectionHandler'

type PostIndexApiRequest = ApiRequest & {
  query : {
    author : string,
    offset : number,
    limit : number
  }
}

async function handler (req: PostIndexApiRequest, res: NextApiResponse<PostIndexResponse>) {
  if (req.method === 'GET') {
    const {author, offset, limit} = req.query
    const posts = await req.ORM.post.listWithAuthor(parseInt(author), offset ? offset : 0, limit ? limit : 5)
    res.status(200).json(posts)
  } else res.status(400).end()
}


export default connectionHandler()(handler)
