# vue-nocaptcha
Aliyun noCAPTCHA for Vue

## 0.2.0 Breaking of noCAPTCHA

- refactor use 'nc.js/nch5.js' locally, not create script again.
- force assets to use https when https prop equal True.
- BTW, fxxking Chinese telecom hijack the internet.
- use 'npm run update' to update 'nc.js/nch5.js' if you fork this project.
- min size from 52kb to 516kb, included 25kb (index.min.js) / nc.js (522kb, async) / nch5 (169kb, async).

* Use 0.1.8 if you don't like it. *

## Install
```cmd
npm install vue-nocaptcha
```

## Usage
```html
<nocaptcha></nocaptcha>
<smartcaptcha></smartcaptcha>
```

```vue
import { nocaptcha, smartcaptcha } from 'vue-nocaptcha'
export default {
    components: {
        nocaptcha,
        smartcaptcha
    }
}
```

```vue
import nocaptcha from 'vue-nocaptcha'
export default {
    Vue.use(nocaptcha)
}
```

## NoCaptcha Parameter

|Parameter         | Type           | Default  | |
| ------------- |:-------------:| -----:|:-------------:|
| https     | bool | false | Use https                  |
| aeis      | bool | false | Use Oversea CDN (Default China) |
| h5      | bool      |  false | Use in H5|
| appkey | string      |    FFFF0000.... | appkey from Aliyun Account|
| scene | string      |     | scene from Aliyun Account|
| lang | string      |     | Language set from Aliyun|
| @load | function | | event on noCAPTCHA load |
| @callback | function | | callback when verify success |
| @error | function | | error callback when verify fail |

## Smartcaptcha Parameter

|Parameter         | Type           | Default  | |
| ------------- |:-------------:| -----:|:-------------:|
| aeis      | bool | false | Use Oversea CDN (Default China) |
| h5      | bool      |  false*** | Use in H5|
| appkey | string      |    FFFF0000.... | appkey from Aliyun Account|
| scene | string      |     | scene from Aliyun Account|
| @load | function | | event on noCAPTCHA load |
| @callback | function | | callback when verify success |
| option | object | | option of smartcaptcha |

For more infomation, please check Doc of Aliyun or my code.

*** TODO fix issue, sciprt reported error when using h5 script...

## Issue

- *Can not use Pc/H5 nocaptcha in same page*
