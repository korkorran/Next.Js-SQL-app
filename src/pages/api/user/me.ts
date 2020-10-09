import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../../utils/ironSession'
import {User} from '../../../utils/types'
import {userInfo} from '../../../models/user'


async function handler (req: NextIronApiRequest, res: NextApiResponse<User>) {
  if (req.method === 'GET') {
    const userSession = req.session.get("user");
    const user = await userInfo(userSession.id)
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

export default withIronSession(handler, ironSessionOptions)
