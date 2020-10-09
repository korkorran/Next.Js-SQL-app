import { useForm } from "react-hook-form";
import {useState} from 'react'
import Axios from 'axios'



type FormData = {
    oldPassword: string;
    newPassword: string;
  };


const PasswordReset = () => {
 
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [error, setError] = useState<string>(null)
  const [success, setSuccess] = useState<string>(null)

  const onSubmit = async (data : FormData) => {
    try {
      const response = await Axios.post('api/user/passwordReset', data)
      console.log(response)
      setError(null)
      setSuccess('Password has been updated')
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
      <label className="label">Old Password</label>
      <div className="control has-icons-left">
          <input 
            className="input" 
            type="password" 
            placeholder="Old Password" 
            name="oldPassword"
            ref={register({ required: true })}
            />
          <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
          </span>
      </div>
      { errors.oldPassword && 
        <p className="help">old password is required</p>
      }
      </div>

      <div className="field">
      <label className="label">New Password</label>
      <div className="control has-icons-left">
          <input 
            className="input" 
            type="password" 
            placeholder="New Password"
            name="newPassword"
            ref={register({ required: true })}
            />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
      </div>
      { errors.newPassword && 
        <p className="help">new password is required</p>
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

export default PasswordReset;
