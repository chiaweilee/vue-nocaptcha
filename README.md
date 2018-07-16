# vue-nocaptcha
Aliyun noCAPTCHA for Vue

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
| aeis      | bool | false | Use Oversea CDN (Default China) |
| h5      | bool      |  false*** | Use H5 Script|
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
| h5      | bool      |  false*** | Use H5 Script|
| appkey | string      |    FFFF0000.... | appkey from Aliyun Account|
| scene | string      |     | scene from Aliyun Account|
| @load | function | | event on noCAPTCHA load |
| @callback | function | | callback when verify success |
| option | object | | option of smartcaptcha |

For more infomation, please check Doc of Aliyun or my code.

*** h5 script is abandoned.
*** TODO fix issue, sciprt reported error when using h5 script...
