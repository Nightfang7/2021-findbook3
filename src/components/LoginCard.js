import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { loginToFirebase, rememberLoginUser } from '../action'
import { StoreContext } from "../store"

const LoginCard = ({ redirect }) => {
  const { state:{ userSignin: { userInfo, loading, error, remember } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();
  
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await loginToFirebase(dispatch, values);
  };

  const onChange = e => {
    rememberLoginUser(dispatch, e.target.checked);
  }

  useEffect(() => {
    if(userInfo) history.push(redirect);
  }, [ userInfo ]); 

  return (
    <Form
      name="normal_login"
      className="login-form"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="title-login">
        <h1>登入帳密</h1>
        
      </div>

      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "E-mail格式不對喔!",
          },
          {
            required: true,
            message: "請輸入E-mail",
          },
        ]}
        hasFeedback
      >
        <Input
          className="login-form-text-color"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="E-Mail"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "請輸入密碼!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          className="login-form-text-color"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密碼"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox onChange={onChange} checked={remember}>記住me!</Checkbox>
        </Form.Item>

        <Link className="login-form__forgot" to={"/"}>
          忘記密碼
        </Link>
      </Form.Item>

      <Form.Item>
        {loading?
        (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button_red"
            loading
          >
            登入
          </Button>
        ):(
          <Button type="primary" htmlType="submit" className="login-form__button_red">
            登入
          </Button>
        )}
        
        <div className="login-form_p">
          <p>或</p>
        </div>
        <Button type="primary" htmlType="submit" className="login-form__button_black">
          <Link to={"/register?redirect=shipping"}>註冊帳號</Link>
        </Button>
        {error === "" ? (
          <></>
        ) : (
          <div className="login-form__error-wrap">
            <h3 className="login-form__error-title">
              <WarningOutlined className="site-form-item-icon" />
              {"  "}There was a problem
            </h3>
            <p className="login-form__error-message">{error}</p>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};
export default LoginCard;
