import { useLocation, useNavigate } from "react-router-dom"

const useNavigateLoginPage = () => {
    const reactNavigate = useNavigate();
    const location = useLocation();

    const navigate = () => {
        reactNavigate(`/login?redirectUrl=${location.pathname}`)
    }
    
    return [navigate];

}

export {
    useNavigateLoginPage
}