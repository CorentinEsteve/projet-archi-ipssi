import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type User = {
    name: string,
    email: string,
    firstName: string
}

export interface UserContextInterface {
    user : User,
    setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
    user: {
        name: "",
        email: "",
        firstName:""
    },
    setUser: (user: User) => {}
} as UserContextInterface;

export const UserContext = createContext(defaultState);

type userProviderProps = {
    children : ReactNode
}


export default function UserProvider( {children} : userProviderProps){
    
    const [user, setUser] = useState<User>({
        name: "",
        email:"",
        firstName:""
    });

 //   let navigate = useNavigate();

    useEffect(() => {
     
        const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}");

        if(currentUser != "{}"){
            setUser({name: currentUser.name, firstName: currentUser.firstName, email: currentUser.email});
           // navigate("/userDashboard");
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    )
}