import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { logoutFromFirebase, updateUserInfo, requestOrderDetail, requestOrderID} from '../action'
import { StoreContext } from "../store"

const ProfileCard = () => {
   const { state: { 
      userSignin: { userInfo }, searchOrderDetailByUid: {
         loading,
         order,
         error,
         tapOrNot
      },
   }, 
   dispatch,
   } = useContext(StoreContext);
   const { displayName, email } = userInfo;
   const history = useHistory();
   const [form] = Form.useForm();
   const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#E26D5C" }} spin />;

   const handleUpdate = (values) => {
      console.log(values)
      updateUserInfo(dispatch, values);
   };

   const handleOrderSearch = () => {
      console.log(order);
      requestOrderID(dispatch);
    };

   const handleLogout = () => {
      logoutFromFirebase(dispatch);
      history.push("/");
   }
   return (
      <div>
         <Form
            onFinish={handleUpdate}
            name="normal_login"
            className="login-form"
            form={form}
         >
            <div className="title-login">
                  <h1>個人資料</h1>
            </div>

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
            
            <div className="login-form_p">
               <p>修改密碼</p>
         </div>

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
               className="login-form__button_black"
            >
               提交
            </Button>

            <Button
               type="danger"
               style={{ marginTop: "0.8rem" }}
               className="login-form__button_red"
               onClick={handleLogout}
            >
               登出
            </Button>
            </Form.Item>
            
            <Button
               type="primary"
               className="login-form__button_black"
               onClick={handleOrderSearch}
            >
               查詢訂單
            </Button>
            
            <div className="profileorderlist">
            
               { tapOrNot?(loading?(
               <div className="spinner-wrap">
                  <Spin indicator={antIcon} className="spinner" />
               </div>
               ):(
               order.length===0?(<div className="eachOrder_title">
                  {/* <div className="login-form_p">
                     <p>訂單:</p>
                  </div> */}
                  <p>None</p></div>):(
                     
                     order.map((order, index)=>{return(
                     <div className="order-list">
                        {/* <div className="order-form_p">
                           <p>訂單: {index+1}</p>
                        </div> */}
                        <Link to={`/order/${order.id}`}>
                           <Button
                           //type="primary"
                           className="login-form__button_gray"
                           style={{ margin: "0.8rem" }}
                        >
                           訂單編號 {index+1}</Button>
                        </Link>
                     </div>
                     
                     )
                     

                     })
                  )
               )):(<div></div>)}
            </div>
         </Form>
         
      </div>
   );
};
export default ProfileCard;
