

const About = () => (
  <div className="columns is-mobile is-centered">
    <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
      <section className="hero is-medium">
        <div className="hero-body">
          <div className="container">
          <h1 className="title">
              Next.Js SQL App
          </h1>
          <h2 className="subtitle">
          A full-fledged Next.Js app powered by an SQL database. Fully compatible with PostgreSQL, MySQL & SQLite
          </h2>
          <p>Built with the great <a href="https://github.com/vvo/next-iron-session">Next-iron-session</a> backend utility to manage client sessions.</p>
          <p>Next.Js SQL app is maintained by <a href="https://github.com/Fredestrik"> Frédéric Lang </a></p>
          </div>
        </div>
      </section>
    </div>
  </div>
)

export default About;
