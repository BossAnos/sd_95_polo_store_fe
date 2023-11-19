import { useReducer } from "react";
import { UserContext } from "./UserContext";
import reducer, { INIT_STATE } from "./reducer";

const UserContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, INIT_STATE);  

    return <UserContext.Provider value={[state, dispatch]}>
        {children}
    </UserContext.Provider> 
}

export {
    UserContextProvider
}