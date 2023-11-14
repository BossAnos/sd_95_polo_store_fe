import { Header } from "./Header"
import { Footer } from "./Footer"
import { UserContextProvider } from "../store"
const UserLayout = ({children}) => {
    return <UserContextProvider>
        <Header>

        </Header>

        <div>{children}</div>
       <Footer></Footer>
    </UserContextProvider>
}

export {
    UserLayout
}