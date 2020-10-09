import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../../utils/ironSession'
import {LoginResponse} from '../../../utils/types'
import {userInfoIfPassWordValid} from '../../../models/user'


async function handler (req: NextIronApiRequest, res: NextApiResponse<LoginResponse>) {
  if (req.method === 'POST') {
    const {email, password} = req.body
    const user = await userInfoIfPassWordValid(email, password);
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


export default withIronSession(handler, ironSessionOptions)
