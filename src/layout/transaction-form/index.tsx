import { Button, Form, Input } from 'antd';
import React from 'react';
import { isAddress } from 'web3-validator';
import Web3 from 'web3';
import JsonERC20Abi from '../../constants/abi/ERC20_ABI.json';
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
    const tBscContractAddress =
      process.env.REACT_APP_BSC_TESTNET_CONTRACT_ADDRESS;
    const privateKey = process.env.REACT_APP_METAMASK_PRIVATE_KEY || '';

    const web3 = new Web3(tBSCProvider);

    const balance = await web3.eth.getBalance(walletAddress);
    if (amount > +web3.utils.fromWei(balance, 'ether')) {
      console.log('Invalid amount!');
      return;
    }

    const contract = new web3.eth.Contract(
      JsonERC20Abi,
      tBscContractAddress
    ) as any;

    const formatedAmount = web3.utils.toWei(amount, 'ether');
    // 0x7cE0E9843AA931D0179A7D88f3001B3830B82dbD

    const tx = {
      from: walletAddress,
      to: toAddress,
      gas: 50000,
      gasPrice: await web3.eth.getGasPrice(),
      data: contract.methods.transfer(toAddress, formatedAmount).encodeABI()
    };

    const signature = await web3.eth.accounts.signTransaction(tx, privateKey);
    await web3.eth
      .sendSignedTransaction(signature.rawTransaction)
      .once('transactionHash', (txhash) => {
        console.log('Mining transaction ...', txhash);
      });

    // contract.methods
    //   .transfer(toAddress, formatedAmount)
    //   .send({ from: walletAddress });
    // const receivedBalance = await web3.eth.getBalance(
    //   '0x7cE0E9843AA931D0179A7D88f3001B3830B82dbD'
    // );

    // console.log(
    //   'pppppoooo',
    //   contract,
    //   'iii',
    //   +web3.utils.fromWei(balance, 'ether'),
    //   'receipt',
    //   receipt
    //   // receivedBalance
    // );
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
          Send (Native token)
        </Button>
        {/* <Button htmlType="button" onClick={onConfirmTransfer}>
          Send (Customized token)
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
