
import useSWR, { mutate } from 'swr'
import useAuth, { ProtectRoute } from '../contexts/auth'
import Skeleton from 'react-loading-skeleton';
import Axios from 'axios';
import Link from 'next/link';

export default () => (
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
            <p>Try to login to access to the <Link href="/settings"><a>settings</a></Link> page.</p>
            <p>Identifiers : <i className="fas fa-envelope"></i> test@123.fr <i className="fas fa-lock"></i> 123</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )

