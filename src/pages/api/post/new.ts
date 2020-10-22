import { NextApiResponse } from 'next'
import {Response, ApiRequest} from '../../../utils/types'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions} from '../../../utils/ironSession'
import connectionHandler from '../../../utils/connectionHandler'


const handler = async (req: ApiRequest, res: NextApiResponse<Response>) => {
    if (req.method === 'POST') {
      // Process a POST request
      const {content} = req.body
      const userSession = req.session.get("user");
      if (!userSession?.id) {
        res.status(400).json({response :"User must be logged in to post message"})
      }
      if (content.length < 5 || content.length > 40000) {
        res.status(400).json({response :"Content must contain between 5 and 40 000 characters"})
      }
      else {
        const id = await req.ORM.post.insertPost(content, userSession.id)
        res.status(200).json({ response : "OK" })
      }
    } else {
      // Handle any other HTTP method
      res.status(400).json({response : "bad request"})
    }
  }

  export default withIronSession(connectionHandler()(handler), ironSessionOptions)
