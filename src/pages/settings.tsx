
import useSWR, { mutate } from 'swr'
import useAuth, { ProtectRoute } from '../contexts/auth'
import Skeleton from 'react-loading-skeleton';
import Axios, {AxiosResponse, AxiosError} from 'axios';
import {UserData} from '../utils/types'


function Dashboard() {

    const { user, loading } = useAuth();
    const { data : {data : data} = {}, isValidating, error } = 
        useSWR<AxiosResponse<UserData>, AxiosError<AxiosResponse<UserData>>>('/api/me', Axios.get)
    if(error) console.log(error.message)
    const showSkeleton = isValidating || loading
    const dataLoaded = !!data
    const settings = Object.entries(data || {})


    return (
        <div className="columns is-mobile is-centered">
            <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
                <section className="hero is-medium">
                    <div className="hero-body">
                        <h1 className="title">
                            Settings
                        </h1>
                        { error &&
                        <h3 className="subtitle">
                            error.message
                        </h3>
                        }
                        <br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Setting</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dataLoaded && settings.map(([key, value], index) => (
                                <tr key={index}>
                                    <th> {index} </th>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                                ))}
                            </tbody>

                        </table>
                        {showSkeleton && <Skeleton height={40} count={5} />}
                    </div>
                </section>
            </div>
        </div>
    )
}




export default ProtectRoute(Dashboard);
