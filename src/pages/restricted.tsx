import useSWR, { mutate } from 'swr'
import Skeleton from 'react-loading-skeleton';
import Axios, {AxiosResponse, AxiosError} from 'axios';

export default () => {
    const { data : {data : data} = {}, isValidating, error } = 
        useSWR<AxiosResponse<string>, AxiosError<AxiosResponse<string>>>('/api/private', Axios.get)
    return (
        <div className="columns is-mobile is-centered">
            <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                        <h1 className="title">
                            Restricted Page
                        </h1>
                    
                        <p>This page is public, with some restricted content. Below is the text from the private <code>/api/private</code> endpoint</p>
                        <div className="box"><p>
                            {!data && <Skeleton height={40} count={4}/> }
                            {data}
                        </p></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )}