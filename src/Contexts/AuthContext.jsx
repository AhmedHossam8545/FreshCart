import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext(0);


export function AuthContextProvider({children}){

    const [userToken , SetUserToken] = useState(localStorage.getItem("token") ?? "");


    return <AuthContext.Provider value={{userToken , SetUserToken}} >
        {children}
    </AuthContext.Provider>
}