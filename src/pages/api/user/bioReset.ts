import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions} from '../../../utils/ironSession'
import {Response, ApiRequest} from '../../../utils/types'
import connectionHandler from '../../../utils/connectionHandler'



async function handler (req: ApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'POST') {
    const {bio} = req.body
    const userSession = req.session.get("user");
    await req.ORM.user.updateBio(userSession.id, bio);
    res.status(200).json({response : 'bio has been updated'});
  } else res.status(400).end()
}


export default withIronSession(connectionHandler()(handler), ironSessionOptions)
