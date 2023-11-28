import {Link} from "react-router-dom";
import { Image, Upload } from "antd";
import { useEffect, useState } from "react";
import { userAuthService } from "../../../../service/user";
import { Button, Form, Input } from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    DeleteOutlined,
    UploadOutlined,
  } from "@ant-design/icons";

const AccountInfo = () =>{
const [authInfo, setAuthInfo] = useState({});
const [form] = Form.useForm();
      useEffect(() => {
    (async () => {
        const authInfo = await userAuthService.getAuthInfo();
      setAuthInfo(authInfo);
      console.log(authInfo);
      form.setFieldsValue({
        ...authInfo,
      });
    })();
  }, []);
    return(
        <div>
            <h1>Thông tin cá nhân</h1>
            <Form
      form={form}
    //   onFinish={updateHandle}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
    >
        <Image src={authInfo.avatar} width={300} ></Image>
        <Form.Item
                          onChange={(e) => {
                            // fileChangeHandle(key, e);
                            console.log(e);
                          }}
                          trigger="false"
                        >
                          <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
                            multiple
                          >
                            <Button icon={<UploadOutlined />}>
                              Upload image
                            </Button>
                          </Upload>
                        </Form.Item>
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Vui lòng nhập email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <button className="btn btn-dark" htmlType="submit">
          Cập nhật Thông tin
        </button>
      </Form.Item>
    </Form>

</div>
        
    );
};
export {AccountInfo}