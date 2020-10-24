import { GetStaticProps, InferGetStaticPropsType } from 'next'
import {User} from 'utils/types'
import UserORM from 'models/user'
import { getDatabaseConnector } from 'utils/dbInjector';
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton';
import PostCardList from 'components/postCardList'
import moment from 'moment'
const connector = getDatabaseConnector();

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
                    backgroundImage: `url("${
                      user.profilePictureURL ? user.profilePictureURL : '/undraw_male_avatar_323b.svg'
                    }")`,
                  }} 
                  />
                <h3 className="title is-3 has-text-centered">{user.username}</h3>
                <p className="subtitle has-text-centered"> <small>{moment(user.created_at).format('LL')}</small></p>
                <p className="has-text-centered">{user.bio}</p>
              </div>
              <h1 className="title">
                  Posts
              </h1>
              <PostCardList author={user.id} />
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
  const db = connector();
  const userORM = new UserORM(db);
  const username = context.params.username
  const user = await userORM.userInfoFromUsername(username)
  await db.destroy()
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
