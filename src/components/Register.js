import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import MaskedInput from 'react-text-mask';
import { v4 as uuidv4 } from 'uuid';

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

const Register = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const history = useHistory();

  const countries = [
    'Country1',
    'Country2',
    'Country3',
    'Country4',
    'Country5',
    'Country6',
    'Country7',
    'Country7',
    'Country8',
    'Country9',
    'Country10',
    'Country11',
    'Country12',
    'Country13',
    'Country14',
    'Country15',
  ];

  const phoneRegExp = /^\+?[78]\s?[-\\(]?\d{3}\)?\s?-?\d{3}-?\d{2}-?\d{2}$/; // +7 (953) 092-93-17
  const passwordRegExp = /(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z]).*/; // 6 символов, есть цифра, есть прописная буква

  const onFinish = (values) => {
    console.log('Success:', values);
    const random = +new Date();

    setTimeout(() => {
      if (random % 2 === 0) {
        alert('successful register');
        history.push('/login');
      } else {
        alert('failed register');
      }
    }, 1000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='register'>
      <h2>Register</h2>
      <Link to='/login'>Go to login</Link>
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
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Invalid name!',
              type: 'string',
              min: 3,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Second Name'
          name='secondName'
          rules={[
            {
              required: true,
              message: 'Invalid Second Name!',
              type: 'string',
              min: 3,
            },
          ]}
        >
          <Input />
        </Form.Item>

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
          label='Country'
          name='country'
          rules={[
            {
              required: true,
              message: 'Please, select country',
            },
          ]}
        >
          <Select>
            {countries.map((elem) => (
              <Select.Option key={uuidv4()} value={elem}>
                {elem}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          rules={[
            {
              required: true,
              message: 'Invalid phone number!',
              validator(_, value) {
                if (value.match(phoneRegExp)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Do not match!'));
              },
            },
          ]}
        >
          <MaskedInput
            className='ant-input'
            type='text'
            placeholder='+7 (956) 314-15-92'
            mask={[
              '+',
              /7/,
              ' ',
              '(',
              /[1-9]/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
            ]}
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Invalid password!',
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
              Register
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
