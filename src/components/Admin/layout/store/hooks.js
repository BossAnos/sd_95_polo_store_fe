import { useContext, } from "react"
import { UserContext } from "./UserContext"

const useUserStore = () => {
    const [state, dispatch] = useContext(UserContext);
    return [state, dispatch];
}

export {
    useUserStore
}