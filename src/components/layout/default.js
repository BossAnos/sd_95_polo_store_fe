import Sidebar from "./sidebar";

function LayoutDefault ({ children }){
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default LayoutDefault;