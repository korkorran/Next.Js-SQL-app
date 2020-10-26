import PostCard from 'components/postCard'
import useSWR, { mutate, useSWRInfinite } from 'swr'
import Skeleton from 'react-loading-skeleton';
import Axios, { AxiosError, AxiosResponse } from 'axios';
import {PostWithAuthorInfo} from 'utils/types'
import NewPost from './newPost'

type PostCardListProps = {
  author? : number,
  newPost? : boolean
}

const PAGE_SIZE = 5

const fetcher = url => fetch(url).then(res => res.json());

const PostCardList = ({author, newPost} : PostCardListProps) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/api/post/?author=${author}&offset=${pageIndex*PAGE_SIZE}&limit=${PAGE_SIZE}`                    // SWR key
  }
  const { data, size, setSize, mutate } = 
    useSWRInfinite<PostWithAuthorInfo[]>(getKey, fetcher)
  
  const posts = data ? [].concat(...data) : []
  const isReachingEnd = (data && data[data.length - 1]?.length < PAGE_SIZE)

  return (
    <>
    {newPost &&
      <NewPost updatePosts={mutate} />
    }
    {posts && posts.map(post => (
      <PostCard key={post.id} post={post} />
    ))}
    { isReachingEnd ?
      <button className="button is-blue is-fullwidth is-static">No more Posts.</button>
      :
      <button className="button is-blue is-fullwidth" onClick={() => setSize(size + 1)}>Load More</button>
    }
    </>
  )
}

export default PostCardList;
