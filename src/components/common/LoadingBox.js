import { Space, Spin } from "antd"

const LoadingBox = () => {
    return <Space size="middle" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    }}>
        <Spin size="large" />

    </Space>
}

export {
    LoadingBox
}