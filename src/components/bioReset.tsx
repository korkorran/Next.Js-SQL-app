import { useForm } from "react-hook-form";
import {useState} from 'react'
import Axios, { AxiosResponse } from 'axios'
import {User} from 'utils/types'
import { mutate } from 'swr'


type FormData = {
    bio: string;
  };

type BioResetProps = {
  bio : string
}

const BioReset = ({bio} : BioResetProps) => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)

  const onSubmit = async (data : FormData) => {
    try {
      const response = await Axios.post('api/user/bioReset', data)
      console.log(response)
      setError(null)
      setSuccess('Bio has been updated')
      mutate('/api/user/me', async (axiosResponse : AxiosResponse<User>) => {
        axiosResponse.data.bio = data.bio;
        return axiosResponse;
      }, false)
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
              {bio}
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
