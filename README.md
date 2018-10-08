# Vue-noCAPTCHA

Aliyun noCAPTCHA

<a href="https://npmcharts.com/compare/vue-nocaptcha?minimal=true"><img src="https://img.shields.io/npm/dm/vue-nocaptcha.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-nocaptcha"><img src="https://img.shields.io/npm/v/vue-nocaptcha.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-nocaptcha"><img src="https://img.shields.io/npm/l/vue-nocaptcha.svg" alt="License"></a>

*Vue.js 2 Only*

## What this do

* Use Aliyun noCAPTCHA in Vue
* Use noCAPTCHA locally, load fast!
* Support both Desktop and H5 noCAPTCHA
* Support full https request
* Support language switch

## Version

*Please Keep Update*

nc.js /* v1.2.25,1.2.26,1 2018-09-20 09:41:53 */

nch5.js /* v1.2.25,1.2.26,1 2018-09-20 10:34:24 */

## Install
```cmd
npm install vue-nocaptcha
```

## Usage

*base usage*

```html
<nocaptcha
  :appkey="'FFFF00000000016AB730'"
  :scene="'test'"
  @callback="getToken"
></nocaptcha>
```

*desktop and h5 set*
```html
<nocaptcha
  :appkey="{
    pc: 'FFFF00000000016AB730',
    h5: 'FFFF00000000016AB730'
  }"
  :scene="{
    pc: 'test',
    h5: 'h5test'
  }"
  @callback="getToken"
></nocaptcha>
```

*as component (suggest)*

```js
import { nocaptcha } from 'vue-nocaptcha'
export default {
    components: {
        nocaptcha,
        smartcaptcha
    }
}
```

*as global component*

```js
import Vue from 'vue'
import nocaptcha from 'vue-nocaptcha'
Vue.use(nocaptcha)
```

###more

*use https*

```html
<nocaptcha
  https
></nocaptcha>
```

*use oversea CDN*

```html
<nocaptcha
  aeis
></nocaptcha>
```

*use lang*

```html
<nocaptcha
  lang="'vi_VN'"
></nocaptcha>
```

*events*

```html
<nocaptcha
  @load="onLoad"
  @callback="onSuccess"
  @error="onError"
></nocaptcha>
```
