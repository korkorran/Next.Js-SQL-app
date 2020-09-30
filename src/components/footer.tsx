import Link from 'next/link'

export default () => (
  <footer className="footer">
    <div className="content has-text-centered">
      Powered by  
        <Link href="/about">
          <a>
            Next.Js SQL App
          </a>
        </Link>
      <p><a href="https://github.com/Fredestrik/Next.Js-SQL-app"><i className="fab fa-github"></i></a></p>
    </div>
  </footer>
)
