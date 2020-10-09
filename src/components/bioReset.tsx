import { useForm } from "react-hook-form";
import {useState} from 'react'
import Axios from 'axios'
import useAuth from '../contexts/auth'


type FormData = {
    bio: string;
  };


const BioReset = () => {
  const { user } = useAuth();
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)

  const onSubmit = async (data : FormData) => {
    try {
      const response = await Axios.post('api/user/bioReset', data)
      console.log(response)
      setError(null)
      setSuccess('Bio has been updated')
    }
    catch (error) {
      setSuccess(null)
      if (error.response) {
        setError(error.response.data.response)
      } else if (error.request) {
        setError("Network error")
      } else {
        setError("Request error")
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    

      <div className="field">
      <div className="control">
          <textarea
            className="textarea" 
            placeholder="Your bio"
            name="bio"
            ref={register({ required: true })}
            >
              {user.bio}
          </textarea>
      </div>
      { errors.bio && 
        <p className="help">bio is required</p>
      }
      </div>

      { error && 
        <div className="notification is-danger is-light">{error}</div>
      }
      { success && 
        <div className="notification is-success is-light">{success}</div>
      }

      <div className="field is-grouped is-grouped-centered">
      <div className="control">
        <input type="submit"  className="button is-success" value="Change"/>
      </div>
      </div>
    </form>
)}

export default BioReset;
