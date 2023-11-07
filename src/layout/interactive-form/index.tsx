import { Button, Form, Input } from 'antd';
import React from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  // const onReset = () => {
  //   form.resetFields();
  // };

  // const onFill = () => {
  //   form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  // };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="note"
        label="Send to address: "
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Amount" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={onFinish}>
          Send (Native token)
        </Button>
        <Button htmlType="button" onClick={onFinish}>
          Send (Customized token)
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
