import useSWR, { mutate } from 'swr'
import Axios, { AxiosError, AxiosResponse } from 'axios'
import { ProtectRoute } from '../contexts/auth'
import Skeleton from 'react-loading-skeleton';
import PasswordReset from '../components/passwordReset'
import BioReset from '../components/bioReset'
import {User} from '../utils/types'


function Settings() {
  const {data , error} = useSWR<AxiosResponse<User>, AxiosError<User>>('/api/user/me', Axios.get)
  const user = data?.data
  const loading = !user

  return (
    <div className="columns is-mobile is-centered">
      <div className="column is-one-quarter">
        <section className="hero is-medium">
          <div className="hero-body">
            {loading && <Skeleton height={100}/>}
            {!loading && 
                <div 
                className="bigAvatar" 
                style={{ backgroundImage: `url("${
                  user.profilePictureURL ? user.profilePictureURL : '/undraw_male_avatar_323b.svg'
                }")`}} 
                />
            }
            { error && 
              <p> {error.message} </p>
            }
          </div>
        </section>
      </div>
      <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
        <section className="hero is-medium">
          <div className="hero-body">
              {loading && <Skeleton height={40} count={10} />}
              {!loading && 
              <>
              <h1 className="title">
                  Settings
              </h1>
              <table className="table">
 
                  <tbody>
                      <tr>
                          <th> email</th>
                          <td>{user.email}</td>
                      </tr>
                      <tr>
                          <th> username</th>
                          <td>{user.username}</td>
                      </tr>
                      <tr>
                          <th> change Password</th>
                          <td> <PasswordReset /> </td>
                      </tr>
                      <tr>
                          <th> created at</th>
                          <td>{user.created_at}</td>
                      </tr>
                      <tr>
                          <th> modified at</th>
                          <td>{user.updated_at}</td>
                      </tr>
                      <tr>
                          <th> bio</th>
                          <td> <BioReset axiosResponse={data} /> </td>
                      </tr>
                  </tbody>
                  
                  
              </table>
              </>
              }
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProtectRoute(Settings);
