import { Space, Spin } from "antd"

const LoadingPage = () => {
    return <Space size="middle" style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <Spin size="large" />

    </Space>
}

export {
    LoadingPage
}