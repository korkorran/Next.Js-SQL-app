[![Next.js](https://assets.zeit.co/image/upload/v1538361091/repositories/next-js/next-js.png)](https://nextjs.org)

<h1 align="center">Next.js ☀️ SQL</h1>

<div align="center">

A full-fledged Next.Js app powered by an SQL database. <br/>
Fully compatible with PostgreSQL, MySQL & SQLite
</div>

<p align="center"><b>Online demo at <a href="https://nextjs-sql-app.vercel.app">https://nextjs-sql-app.vercel.app/</a> </b></p>


<h2 align="center">Features</h2>

<p align="center">:heavy_check_mark: No Express.js :heavy_check_mark: Serverless ready :heavy_check_mark: API Routes </p>

<h3 align="center">:lock: Authentication</h3>

<div align="center">

<sup>with [next-iron-session](https://github.com/vvo/next-iron-session)</sup>

- [x] Session
- [x] Sign up/Sign in/Sign out

</div>

<h3 align="center">:woman::man: Profile</h3>

<div align="center">

- [x] Profile picture, name, bio, email
- [x] Edit profile

</div>

<h3 align="center">:wrench: Account</h3>

<div align="center">

- [x] Email verification
- [x] Password change
- [x] Password reset

</div>

<h3 align="center">:eyes: Users and social</h3>

<div align="center">

- [x] Other user profile
- [x] Posting

</div>

<h3 align="center">🏛 SQL powered</h3>

<div align="center">

- [x] Work with any SQL database
- [x] PostgreSQL, MySQL & SQLite ready

</div>

<div align="center">
  
<sup>Have any features that interest you, [make an issue](https://github.com/Fredestrik/Next.Js-SQL-app/issues). Would like to work on a feature, [make a PR](https://github.com/Fredestrik/Next.Js-SQL-app/pulls).<sup>
  
</div>

---

_How security is managed?_

Vercel serve apps with HTTPS by default, so you have no reasons to have security concerns. Once the user is authentified, the connexion is secured with a next-iron cookie. Then, authentification of the user is super-fast and secure.

## Code Features

* Coded in TypeScript.
* This app uses Next.js static generation for all its pages. The main advantage is that the application is super-fast.
* All the dynamic data is fetch within the pages with the great [useSWR](https://swr.vercel.app/) hook. It enables data caching and make the app even faster.
* Pages that should not be access from public user are protected inside a protected route. If a public user attemps to access to these pages, he is redirected to the login page.
* privates API routes are protected with the [next-iron-session](https://github.com/vvo/next-iron-session) utility. If the user is not authentified, the data from the API endpoint is not returned.
* 📱 The design is made with [Bulma.io](https://bulma.io/) CSS and is fully responsive.
* SQL Database requests are made with the [Knex.Js](http://knexjs.org/) SQL query builder.

## Getting Started

First, run the development server:

```bash
cp .env.example .env
# edit .env
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

_This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app)._

[![Deploy with Vercel](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/Fredestrik/Next.Js-SQL-app)

It can also be deployed locally with `npm run build & npm start` command.

Be sure to set the environment variable to enable next-iron encryption of the sessions cookies.

To do that, copy the ```.env.example```file into ```.env```, and set your own 32 character long password for IRON_PASSWORD.

### environments database

* development : set ```KNEX_ENV``` to development. SQLite3 stored in file ```./dev.sqlite3```
* production : set ```KNEX_ENV``` to production. PostgreSQL whose credentials are env variables PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD

edit ```knexfile.js``` to change database connections

## API docs

_All the API endpoints work within Next.js API routes. They can be found in `src/pages/api` folder. The complex types of JSON body returned by API endpoints can be found in the [`src/utils/types.ts`](https://github.com/Fredestrik/Next.Js-SQL-app/blob/master/src/utils/types.ts) file._

URL| HTTP method | returned Type | Public | Description
-|-|-|-|-
`/api/log-in` | `POST` | `LoginResponse` | ✅ | If the user is successfully authentified or not. Gives also details about the user.
`/api/me` | `GET` | `UserData`| ❌ | Details about the user
`/api/private` | `GET` | `string` | ❌ | Example text
`/api/public`| `GET` | `string` | ✅| Example text
`/api/sign-up` | `POST` | `SignupResponse` | ✅ | If the user is successfully registered or not. *Not effective*.

## Further work

Please add any issue if you think the app can be improved !
