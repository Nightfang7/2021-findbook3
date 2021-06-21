import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Radio, Button } from "antd";
import { savePaymentMethod } from "../action"
import { StoreContext } from "../store";

export default function PaymentMethodCard() {
   const { state: { cart: { paymentMethod } }, dispatch } = useContext(StoreContext);
   const history = useHistory()
   const [form] = Form.useForm();

   const handleSubmit = (values) => {
      savePaymentMethod(dispatch, values);
      history.push('/placeorder');
   };

   const backToAddress = () => {
      history.push("/shipping");
   };

   return (
      <Form
         onFinish={handleSubmit}
         name="normal_login"
         className="payment-form"
         initialValues={{paymentMethod}}
         form={form}
      >

         <Form.Item name="paymentMethod" label="選擇付款方式:">
            <Radio.Group>
               <Radio value="Google">Google Pay</Radio>
               <Radio value="PayPal">PayPal</Radio>
               <Radio value="Line">Line Pay</Radio>
            </Radio.Group>
         </Form.Item>

         <Form.Item>
            <div className="payment-form__button">
               <Button
                  type="primary"
                  htmlType="submit"
                  
                  onClick={backToAddress}
               >
                  上一步
               </Button>

               <Button
                     type="primary"
                     htmlType="submit"
               >
                  下一步
               </Button>
            </div>
            
         </Form.Item>
      </Form>
   );
}

