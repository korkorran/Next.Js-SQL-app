import Link from 'next/link'

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      Powered by  
        <Link href="/about">
          <a>
            Next.Js SQL App
          </a>
        </Link>
      <p>
        <a href="https://github.com/Fredestrik/Next.Js-SQL-app" suppressHydrationWarning={true}>
          <i className="fab fa-github"></i>
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
