import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import React, { useState } from 'react';
import Web3 from 'web3';
import { isAddress } from 'web3-validator';
import { TransactionFormFieldsType } from '../../models';
import { useNativeContract } from '../../web3/hooks';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

interface IProps {}

const TransactionForm: React.FC<IProps> = () => {
  const [form] = Form.useForm<TransactionFormFieldsType>();
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sendNativeTransaction } = useNativeContract();

  const openNotification = (
    type: 'success' | 'failed',
    errorMsg: string = ''
  ) => {
    if (type === 'success') {
      api.success({
        message: 'Successfully tranferred!',
        description: `Your transaction has been sent to ${form.getFieldValue(
          'address'
        )} successfully!`
      });
    }

    if (type === 'failed') {
      api.error({
        message: 'Unsuccessfully tranferred!',
        description: errorMsg
      });
    }
  };

  const onConfirmTransfer = async () => {
    try {
      setIsLoading(true);
      const { address: toAddress, amount } = form.getFieldsValue();
      const formatedAmount = Web3.utils.toWei(amount, 'ether');
      const receipt = await sendNativeTransaction(toAddress, formatedAmount);

      if (receipt) {
        openNotification('success');
      }

      form.resetFields();
    } catch (error) {
      console.log(error);
      openNotification('failed', 'Some errors occurred during transaction!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
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
            <Spin
              spinning={isLoading}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
              Send (tBNB)
            </Spin>
          </Button>
          {/* <Button htmlType="button" onClick={onConfirmTransfer}>
          Send (Customized token)
        </Button> */}
        </Form.Item>
      </Form>
    </>
  );
};

export default TransactionForm;
