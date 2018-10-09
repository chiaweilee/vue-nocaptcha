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

## Install
```cmd
npm install vue-nocaptcha
```

## Version

*NOTE: Please Keep Update this plugin to maintain nc.js and nch5.js files fresh*

there's 3 versions of Vue-noCAPTCHA now.

* full version (support both desktop and H5)

```js
// import { nocaptcha } from 'vue-nocaptcha'
import nocaptcha from 'vue-nocaptcha/nocaptcha.js'
export default {
    components: {
        nocaptcha
    }
}
```

And,

* single desktop version

```js
import nocaptcha from 'vue-nocaptcha/nocaptcha_pc.js'
export default {
    components: {
        nocaptcha
    }
}
```

* single H5 version

```js
import nocaptcha from 'vue-nocaptcha/nocaptcha_h5.js'
export default {
    components: {
        nocaptcha
    }
}
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
        nocaptcha
    }
}
```

*as global component*

```js
import Vue from 'vue'
import nocaptcha from 'vue-nocaptcha'
Vue.use(nocaptcha)
```

*pc/h5 version control*

*Normally, it can be control automatic.*

Maybe, you need control it yourself.

```html
<nocaptcha
  :h5="isMobile()"
></nocaptcha>
```

*NOTE: no h5 prop in single PC/H5 version*

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
