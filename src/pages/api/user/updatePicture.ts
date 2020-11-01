import { NextApiResponse } from 'next'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions} from 'utils/ironSession'
import {UpdatePictureResponse, ApiRequest} from 'utils/types'
import connectionHandler from 'utils/connectionHandler'
import { v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import nc from 'next-connect';

const handler = nc<ApiRequest, NextApiResponse>()

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : 'nextjs-sql-app'
    }
})

var upload = multer({ storage: storage }).single('picture')


handler.post( upload, async (req: ApiRequest, res: NextApiResponse<UpdatePictureResponse>) => {
  if (req.method === 'POST') {
    const userSession = req.session.get("user");
    if(userSession?.id) {
      console.log(req?.file)
      await req.ORM.user.updatePicture(userSession.id, req.file.path)
      res.status(200).json({response : 'picture has been updated', pictureURL : req.file.path});
    }
    else {
        res.status(400).json({response : 'User is not authenticated'})
    }
  } else res.status(400).end()
})

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withIronSession(connectionHandler()(handler), ironSessionOptions)
