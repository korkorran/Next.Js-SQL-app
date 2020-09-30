
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
              All post from the web!
          </h1>
          </div>
        </div>
      </section>
    </div>
  </div>
)

