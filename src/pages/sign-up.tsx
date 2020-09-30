import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/router'
import Axios from "axios";

type FormData = {
  email: string;
  username : string;
  password: string;
  passwordConfirm : string
};


export default () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [error, setError] = useState(null)
  const router = useRouter()

  const onSubmit = async (data : FormData) => {
    try {
      const response = await Axios.post("/api/sign-up", data)
      setError(null)
      router.push('/')
    }
    catch (error) {
      // Error 😨
      if (error.response) {
        /*
        * The request was made and the server responded with a
        * status code that falls out of the range of 2xx
        */
        setError(error.response.data.response)
      } else if (error.request) {
          /*
          * The request was made but no response was received, `error.request`
          * is an instance of XMLHttpRequest in the browser and an instance
          * of http.ClientRequest in Node.js
          */
          setError("Network error")
      } else {
          // Something happened in setting up the request and triggered an Error
          setError("Request error")
      }
    }
  };
  return (
    <div className="columns is-mobile is-centered">
      <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <div className="box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
                <input 
                  className="input is-danger" 
                  type="email" 
                  placeholder="Email input"
                  name="email"
                  ref={register({ required: true })}
                  />
                <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
                </span>
            </div>
            { errors.email && 
              <p className="help">Email is required</p>
            }
            </div>

            <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left">
                <input 
                  className="input is-danger" 
                  type="text"
                  placeholder="Username input"
                  name="username"
                  ref={register({ required: true })}
                  />
                <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
                </span>
            </div>
            { errors.username && 
              <p className="help">Username is required</p>
            }
            </div>
  
            <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left">
                <input 
                  className="input" 
                  type="password" 
                  placeholder="Password input"
                  name="password"
                  ref={register({ required: true })}
                  />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
            </div>
            { errors.password && 
              <p className="help">Password is required</p>
            }
            </div>

            <div className="field">
            <label className="label">Confirm your password</label>
            <div className="control has-icons-left">
                <input 
                  className="input" 
                  type="password" 
                  placeholder="Password input"
                  name="passwordConfirm"
                  ref={register({ required: true })}
                  />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
            </div>
            { errors.passwordConfirm && 
              <p className="help">Password confirmation is required</p>
            }
            </div>

            { error && 
              <div className="notification is-danger is-light">{error}</div>
            }

            <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <input type="submit"  className="button is-success" value="Sign up"/>
            </div>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
}