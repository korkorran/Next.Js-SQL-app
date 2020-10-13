import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions} from '../../../utils/ironSession'
import {LoginResponse, ApiRequest} from '../../../utils/types'
import connectionHandler from '../../../utils/connectionHandler'

async function handler (req: ApiRequest, res: NextApiResponse<LoginResponse>) {
  if (req.method === 'POST') {
    const {email, password} = req.body
    const user = await req.ORM.user.userInfoIfPassWordValid(email, password);
    if (user) {
      req.session.set("user", {
        id: user.id,
        admin: false,
      });
      await req.session.save();
      res.status(200).json({ 
        response : "OK", 
        authenticated: true,
        user: user
      })
    }
    else {
      res.status(400).json({response :"Bad email or password", authenticated:false})
    }
  } else res.status(400).end()
}


export default withIronSession(connectionHandler()(handler), ironSessionOptions)
