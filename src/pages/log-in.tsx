import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/router'
import useAuth from "../contexts/auth"

type FormData = {
  email: string;
  password: string;
};


const LogIn = () => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [error, setError] = useState(null)
  const router = useRouter()
  const { login } = useAuth();

  const onSubmit = async (data : FormData) => {
    const error = await login(data.email, data.password)
    setError(error)
    if(error == null) router.push('/')
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

            { error && 
              <div className="notification is-danger is-light">{error}</div>
            }
            

            <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <input type="submit"  className="button is-success" value="Log in"/>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
  
export default LogIn;
