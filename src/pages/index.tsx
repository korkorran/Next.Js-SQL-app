import PostCard from 'components/postCard'
import useSWR, { mutate } from 'swr'
import Skeleton from 'react-loading-skeleton';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import {PostWithAuthorInfo} from 'utils/types'
import Link from 'next/link';

const Index = () => { 
  const {data , error} = useSWR<AxiosResponse<PostWithAuthorInfo[]>, AxiosError<PostWithAuthorInfo[]>>('/api/post/', Axios.get)
  const posts = data?.data
  const loading = !posts
  
  return (
  <div className="columns is-mobile is-centered">
    <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container">
          <h1 className="title">
              All post from the web!
          </h1>
          </div>
          { posts && posts?.map(post => (
            <PostCard post={post} />
          ))}
        </div>
      </section>
    </div>
  </div>
)}

export default Index;
