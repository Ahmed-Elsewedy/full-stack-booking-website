import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getToken } from "./pages/authentication";
import axios from "axios";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [ready, serReady] = useState(false)
    useEffect(() => {
        if (!user) {
            const token = getToken()
            axios.get('user/profile', {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                setUser(response.data.data.user)
                serReady(true)
            }).catch(error => {
                console.log(error.message);
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}