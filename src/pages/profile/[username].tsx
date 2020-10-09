import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {User} from '../../utils/types'
import {userInfoFromUsername} from '../../models/user'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton';


const Profile = ({user} : InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const loading = router.isFallback

  return (
    <div className="columns is-centered">
      <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
        <section className="hero">
          <div className="hero-body">
              {loading && <Skeleton height={40} count={10} />}
              {!loading && 
              <>
              <div style={{
                width : "300px",
                margin:"auto"
                }}>
              <div 
                className="bigAvatar" 
                style={{ 
                  backgroundImage: `url("${user.profilePictureURL}")`,
                }} 
                />
              <h3 className="title is-3 has-text-centered">{user.username}</h3>
              <p className="subtitle is-size-6 has-text-centered">{user.created_at}</p>
              <p className="has-text-centered">{user.bio}</p>
              </div>
              <h1 className="title">
                  No Posts
              </h1>

              </>
              }
          </div>
        </section>
      </div>
    </div>
  )
}


type Params = {
  username: string
}

export const getStaticProps : GetStaticProps<{user :User}, Params> = async (context) => {
    const username = context.params.username
    const user = await userInfoFromUsername(username)
    return {
      props: {user}, // will be passed to the page component as props
      revalidate : 1,
    }
  }

  export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    }
  }

export default Profile;
