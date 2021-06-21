import React from 'react';
import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

export default function CheckoutSteps(props) {
  return (
    <div>
      <Steps responsive className="container checkout-steps">
        <Step status={props.step1 ? 'finish' : 'wait'} title="登入" icon={<UserOutlined />} />
        <Step status={props.step2 ? 'finish' : 'wait'} title="寄送資訊" icon={<SolutionOutlined />} />
        <Step status={props.step3 ? 'finish' : 'wait'} title="付款" icon={<LoadingOutlined />} />
        <Step status={props.step4 ? 'finish' : 'wait'} title="訂單資訊" icon={<SmileOutlined />} />
      </Steps>
    </div>
    
    
  );
}
