import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions} from '../../../utils/ironSession'
import {Response, ApiRequest} from '../../../utils/types'
import connectionHandler from '../../../utils/connectionHandler'

async function handler (req: ApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const {oldPassword, newPassword} = req.body
    const userSession = req.session.get("user");
    if (await req.ORM.user.isPassWordValid(userSession.id, oldPassword)) {
      await req.ORM.user.updatePassword(userSession.id, newPassword)
      res.status(200).json({response : 'ok'})
    }
    else {
      res.status(400).json({response :"old password is wrong"})
    }
  } else res.status(400).end()
}


export default withIronSession(connectionHandler()(handler), ironSessionOptions)
