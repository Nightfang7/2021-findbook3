import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { logoutFromFirebase, updateUserInfo } from '../action'
import { StoreContext } from "../store"

const ProfileCard = () => {
   const { state: { userSignin: { userInfo } }, dispatch } = useContext(StoreContext);
   const { displayName, email } = userInfo;
   const history = useHistory();
   const [form] = Form.useForm();

   const handleUpdate = (values) => {
      console.log(values)
      updateUserInfo(dispatch, values);
   };

   const handleLogout = () => {
      logoutFromFirebase(dispatch);
      history.push("/");
   }
   return (
      <Form
         onFinish={handleUpdate}
         name="normal_login"
         className="login-form"
         form={form}
      >
         <Form.Item
         className="login-form-text"
         label="姓名: "
         name="name"
         rules={[
            {
               type: "string",
               message: "姓名格式不符合!",
            },
            {
               message: "請輸入您的姓名!",
            },
         ]}
         hasFeedback
         >
         <Input className="login-form-text-color" defaultValue={displayName} placeholder={displayName} />
         </Form.Item>
         <Form.Item
         className="login-form-text"
         label="email: "
         name="email"
         rules={[
            {
               type: "email",
               message: "E-mail格式不對喔!",
            },
            {
               message: "請輸入您的E-mail!",
            },
         ]}
         hasFeedback
         >
         <Input className="login-form-text-color" defaultValue={email} placeholder={email} />
         </Form.Item>
         <Form.Item
         className="login-form-text"
         name="password"
         label="密碼"
         rules={[
            {
               message: "請輸入您的密碼!",
            },
         ]}
         hasFeedback
         >
         <Input.Password className="login-form-text-color" />
         </Form.Item>

         <Form.Item
         className="login-form-text"
         name="rePassword"
         label="再輸入密碼"
         dependencies={["password"]}
         hasFeedback
         rules={[
            {
               message: "請輸入您的密碼!",
            },
            ({ getFieldValue }) => ({
               validator(_, value) {
               if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
               }

               return Promise.reject(
                  new Error("兩組密碼不相符!")
               );
               },
            }),
         ]}
         >
         <Input.Password  className="login-form-text-color"/>
         </Form.Item>

         <Form.Item>
         <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
         >
            提交
         </Button>

         <Button
            type="danger"
            style={{ marginTop: "0.8rem" }}
            className="login-form__button"
            onClick={handleLogout}
         >
            登出
         </Button>
         </Form.Item>
      </Form>
   );
};
export default ProfileCard;
