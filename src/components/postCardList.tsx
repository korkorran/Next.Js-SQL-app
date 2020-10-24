import PostCard from 'components/postCard'
import useSWR, { mutate, useSWRInfinite } from 'swr'
import Skeleton from 'react-loading-skeleton';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import {PostWithAuthorInfo} from 'utils/types'

type PostCardListProps = {
  author? : number
}

const fetcher = url => fetch(url).then(res => res.json());

const PostCardList = ({author} : PostCardListProps) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/post/?author=${author}&offset=${pageIndex*5}&limit=5`                    // SWR key
  }
  const { data, size, setSize } = 
    useSWRInfinite<PostWithAuthorInfo[]>(getKey, fetcher)
  
  const posts = data ? [].concat(...data) : []

  return (
    <>
    {posts && posts.map(post => (
      <PostCard key={post.id} post={post} />
    ))}
    <button className="button is-blue is-fullwidth" onClick={() => setSize(size + 1)}>Load More</button>
    </>
  )
}

export default PostCardList;
