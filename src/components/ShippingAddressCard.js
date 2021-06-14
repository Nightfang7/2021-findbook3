import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { saveShippingAddress } from "../action"
import { StoreContext } from "../store";

export default function ShippingAddressCard() {
  const { state: { cart: { shippingAddress } }, dispatch } = useContext(StoreContext);
  const history = useHistory()
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    saveShippingAddress(dispatch, values)
    history.push('/payment');
  };

  return (
    <Form
      onFinish={handleSubmit}
      name="normal_login"
      className="shipping-form"
      initialValues={shippingAddress}
      form={form}
    >
      <Form.Item
        label="全名: "
        name="fullName"
        rules={[
          {
            type: "string",
          },
          {
            required: true,
            message: "請輸入全名",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="輸入全名" />
      </Form.Item>
      <Form.Item
        label="地址: "
        name="address"
        rules={[
          {
            type: "string",
          },
          {
            required: true,
            message: "請輸入地址",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="輸入地址" />
      </Form.Item>
      <Form.Item
        label="縣市: "
        name="city"
        rules={[
          {
            required: true,
            message: "請輸入縣市",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="輸入縣市" />
      </Form.Item>

      <Form.Item
        label="郵遞區號: "
        name="postalCode"
        rules={[
          {
            required: true,
            message: "請輸入郵遞區號",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="輸入郵遞區號" />
      </Form.Item>

      <Form.Item
        label="國家: "
        name="country"
        rules={[
          {
            required: true,
            message: "請輸入國家",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="輸入國家" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form__button"
        >
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
}

