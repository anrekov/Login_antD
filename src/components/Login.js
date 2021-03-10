import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 9, // default: 8 / 16
    span: 15,
  },
};

const Login = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const [msg, setMsg] = useState(null);

  const passwordRegExp = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z]).*/;

  const onFinish = (values) => {
    console.log('Success:', values);
    setMsg(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <Link to='/register'>Go to register</Link>
      <hr width='400px' />
      <br />

      <Form
        form={form}
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Invalid email!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Invalid password!',
              // pattern: passwordRegExp
              validator(_, value) {
                if (value.match(passwordRegExp)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Do not match!'));
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} shouldUpdate>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>

      {msg && (
        <div className='messageBox'>
          <h3>{msg.email}</h3>
          <h3>{msg.password}</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
