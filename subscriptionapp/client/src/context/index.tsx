import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

interface User {
  data: {
    id: string,
    email: string,
    stripeCustomerId: string,
  } | null,
  error: string | null,
  loading: boolean
}

const UserContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([
  {
  data: null,
  loading: true,
  error: null
  },
  () => {}
]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null
  });

  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    const { data: response } = await axios.get("http://localhost:5000/auth/me");

    if(response.data && response.data.user) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
          stripeCustomerId: response.data.user.stripeCustomerId
        },
        loading: false,
        error: null
      })
    } else if(response.data && response.data.error.length) {
      setUser({
        data: {
          id: response.data.user.id,
          email: response.data.user.email,
          stripeCustomerId: response.data.user.stripeCustomerId
        },
        loading: false,
        error: response.errors[0].msg
      })
    }
  }

  useEffect(() => {
    if(token) {
      fetchUser()
    } else {
      setUser({
        data: null,
        loading: false,
        error: null
      })
    }
  }, [])

  return (
  <UserContext.Provider value={[user, setUser]}>
    {children}
  </UserContext.Provider>
  )
};

export { UserContext, UserProvider };