import useSWR, { mutate } from 'swr'
import Skeleton from 'react-loading-skeleton';
import Axios, {AxiosResponse, AxiosError} from 'axios';

export default () => {
    const { data : {data : data} = {}, isValidating, error } = 
        useSWR<AxiosResponse<string>, AxiosError<AxiosResponse<string>>>('/api/public', Axios.get)
    return (
        <div className="columns is-mobile is-centered">
            <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                        <h1 className="title">
                            Public Page
                        </h1>
                    
                        <p>All the content of the page is public. Below is the text from the public <code>/api/public</code> endpoint</p>
                        <div className="box"><p>{data}</p></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )}
