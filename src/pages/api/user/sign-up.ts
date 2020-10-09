import { NextApiResponse } from 'next'
import {SignupResponse} from '../../../utils/types'
import { withIronSession } from "next-iron-session";
import {ironSessionOptions, NextIronApiRequest} from '../../../utils/ironSession'
import {emailExists, usernameExists, registerUser, userInfo} from '../../../models/user'

const signUp = async (req: NextIronApiRequest, res: NextApiResponse<SignupResponse>) => {
    if (req.method === 'POST') {
      // Process a POST request
      const {email, username, password, passwordConfirm} = req.body
      if (await emailExists(email)) {
        res.status(400).json({ response : "Email already exists", register: false })
      }
      else if (await usernameExists(username)) {
        res.status(400).json({ response : "Username already exists", register: false })
      }
      else if (password.length < 7 || password.length > 20 ) {
        res.status(400).json({ response : "Password must contain between 7 and 20 characters", register: false })
      }
      else if (password != passwordConfirm) {
        console.log('password ' , typeof password, password);
        console.log('confirm ', typeof passwordConfirm, passwordConfirm)
        res.status(400).json({ response : "Confirmation does not match password", register: false })
      }
      else if (username.length < 5 || username.length > 40) {
        res.status(400).json({response :"Username must contain between 5 and 40 characters", register:false})
      }
      else {
        const id = await registerUser(username, email, password);
        const user = await userInfo(id);
        req.session.set("user", {id: user.id,admin: false,});
        await req.session.save();
        res.status(200).json({ response : "OK", register: true, user : user })
      }
    } else {
      // Handle any other HTTP method
      res.status(400).json({response : "bad request", register:false})
    }
  }

  export default withIronSession(signUp, ironSessionOptions)
