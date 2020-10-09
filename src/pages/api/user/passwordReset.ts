import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../../utils/ironSession'
import {Response} from '../../../utils/types'
import {isPassWordValid, updatePassword} from '../../../models/user'


async function handler (req: NextIronApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const {oldPassword, newPassword} = req.body
    const userSession = req.session.get("user");
    if (await isPassWordValid(userSession.id, oldPassword)) {
      updatePassword(userSession.id, newPassword)
      res.status(200).json({response : 'ok'})
    }
    else {
      res.status(400).json({response :"old password is wrong"})
    }
  } else res.status(400).end()
}


export default withIronSession(handler, ironSessionOptions)
