import { Empty } from "antd"

const EmptyPage = ({description}) => {
    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Empty description={description}/>
    </div> 
}

export {
    EmptyPage
}