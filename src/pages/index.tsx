import PostCardList from 'components/postCardList'
import NewPost from 'components/newPost'


const Index = () => {   
  return (
  <div className="columns is-mobile is-centered">
    <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
          <h1 className="title">
              All post from the web!
          </h1>
          </div>
          <NewPost />
          <PostCardList />
        </div>
      </section>
    </div>
  </div>
)}

export default Index;
