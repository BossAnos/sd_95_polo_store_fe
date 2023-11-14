import { useNavigate, useSearchParams } from "react-router-dom"

const useNavigateOrRedirectUrl = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParam] = useSearchParams();

    const setPage = (url) => {
        const redirectUrl = searchParams.get('redirectUrl');
        navigate(redirectUrl || url);
    }
    return [setPage, ];
}

export {
    useNavigateOrRedirectUrl
}