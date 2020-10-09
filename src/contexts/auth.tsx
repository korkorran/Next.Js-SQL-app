import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Axios from 'axios';
import { User, LoginResponse, SignupResponse } from '../utils/types';


type ContextProps = { 
  isAuthenticated: boolean,
  loading: boolean,
  user : User
  login : { (email : string, password : string) : Promise<string>},
  signup : { (email : string, username : string, password : string, passwordConfirm : string) : Promise<string>},
  logout : {() : void}
};

const AuthContext = createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('next-auth-starter')

            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                const { data : user } = await Axios.get<User>('api/user/me', {baseURL : "/"})

                if (user) setUser(user);
            }
            else {
                console.log('No Cookie')
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    async function login (email : string, password : string) {
      try {
        const { data } = await Axios.post<LoginResponse>('api/user/log-in', { email, password })
        const {user} = data
        if (user) {
            setUser(user)
        }
        return null;
      }
      catch (error) {
        // Error 😨-> return error message from response if it exists
        if (error.response) {
          return error.response.data.response
        } else if (error.request) {
            return "Network error"
        } else {
            return "Request error"
        }
      }
    }

    async function signup (email : string, username : string, password : string, passwordConfirm : string) {
        try {
          const { data } = await Axios.post<SignupResponse>('api/user/sign-up', { email, username, password, passwordConfirm })
          const {user} = data
          if (user) {
              setUser(user)
          }
          return null;
        }
        catch (error) {
          // Error 😨-> return error message from response if it exists
          if (error.response) {
            return error.response.data.response
          } else if (error.request) {
              return "Network error"
          } else {
              return "Request error"
          }
        }
      }

    const logout = () => {
        Cookies.remove('next-auth-starter')
        setUser(null)
        router.push('/')
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}



export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};

export function ProtectRoute(Component, ...rest) {
    return () => {
        const { isAuthenticated, loading } = useAuth();
        const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated && !loading) router.push('/log-in')
        }, [loading, isAuthenticated])

        return (<Component {...rest} />)
    }
}

