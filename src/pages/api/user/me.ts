import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions} from '../../../utils/ironSession'
import {User, ApiRequest} from '../../../utils/types'
import connectionHandler from '../../../utils/connectionHandler'


async function handler (req: ApiRequest, res: NextApiResponse<User>) {
  if (req.method === 'GET') {
    const userSession = req.session.get("user");
    const user = await req.ORM.user.userInfo(userSession.id)
    if(user) {
      res.status(200).json(user)
    }
    else {
      res.status(401).end()
    }
  } else {
    // Handle any other HTTP method
    res.status(400).end()
  }
}

export default withIronSession(connectionHandler()(handler), ironSessionOptions)
