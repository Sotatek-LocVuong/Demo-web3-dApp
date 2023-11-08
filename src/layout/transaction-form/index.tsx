import { Button, Form, Input } from 'antd';
import React from 'react';
import Web3 from 'web3';
import { isAddress } from 'web3-validator';
import { TransactionFormFieldsType } from '../../models';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

interface IProps {
  walletAddress: string;
}

const TransactionForm: React.FC<IProps> = ({ walletAddress }: IProps) => {
  const [form] = Form.useForm<TransactionFormFieldsType>();

  const onConfirmTransfer = async () => {
    const { address: toAddress, amount } = form.getFieldsValue();
    const tBSCProvider = process.env.REACT_APP_BSC_TESTNET_PROVIDER;

    const web3 = new Web3((window as any).ethereum || tBSCProvider);
    const balance = await web3.eth.getBalance(walletAddress);
    if (amount > +web3.utils.fromWei(balance, 'ether')) {
      console.log('Invalid amount!');
      form.resetFields();
      return;
    }

    const formatedAmount = web3.utils.toWei(amount, 'ether');
    const receipt = await web3.eth.sendTransaction({
      from: walletAddress,
      to: toAddress,
      value: formatedAmount
    });
    console.log('receipt', receipt);

    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="address"
        label="Send to address: "
        rules={[
          {
            validator: (_, value) => {
              if (!isAddress(value)) {
                return Promise.reject();
              }
              return Promise.resolve();
            },
            message: 'Invalid address!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[
          {
            validator: (_, value) => {
              if (value <= 0) {
                return Promise.reject();
              }
              return Promise.resolve();
            },
            message: 'Invalid amount!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={onConfirmTransfer}>
          Send (tBNB)
        </Button>
        {/* <Button htmlType="button" onClick={onConfirmTransfer}>
          Send (Customized token)
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
