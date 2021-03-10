### Ant Design

```
import { Form, Input, Button } from 'antd';

<MaskedInput className='ant-input' />
```
### Deploy:

1. Console:
```
npm install gh-pages --save-dev
```

2. Add properties to package.json file:
```
"homepage": "http://anrekov.github.io/Login_antD",
"name": "login-antdesign",
// ...

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  // ...
```
3. add remote

4. npm run deploy

### End