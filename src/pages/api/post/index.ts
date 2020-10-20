import { NextApiResponse } from 'next'
import {PostIndexResponse, ApiRequest, Post} from 'utils/types'
import connectionHandler from 'utils/connectionHandler'

type PostIndexApiRequest = ApiRequest & {
  query : {
    author : string
  }
}

async function handler (req: PostIndexApiRequest, res: NextApiResponse<PostIndexResponse>) {
  if (req.method === 'GET') {
    const {author} = req.query
    const posts = await req.ORM.post.listWithAuthor(parseInt(author))
    res.status(200).json(posts)
  } else res.status(400).end()
}


export default connectionHandler()(handler)
