# Vue-noCAPTCHA

<a href="https://npmcharts.com/compare/vue-nocaptcha?minimal=true"><img src="https://img.shields.io/npm/dm/vue-nocaptcha.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vue-nocaptcha"><img src="https://img.shields.io/npm/v/vue-nocaptcha.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-nocaptcha"><img src="https://img.shields.io/npm/l/vue-nocaptcha.svg" alt="License"></a>

*Vue.js 2 Only*

## What this do

1. LoadAsync
2. LoadFast 🔜
3. Support Desktop and Mobile 📱💻
4. Support Full HTTPS 🔒
5. Support Languages 🇨🇳🇺🇸🇬🇧🇯🇵🇩🇪🇪🇸🇫🇷🇮🇩🇮🇹🇰🇷🇳🇱🇵🇱🇷🇺🇹🇭🇹🇷🇻🇳

## Install
```cmd
npm install vue-nocaptcha
```

## Version

*NOTE: Please Keep Update this plugin to maintain nc.js and nch5.js files fresh*

## Full version (both Desktop and Mobile)

```js
// import { nocaptcha } from 'vue-nocaptcha'
import nocaptcha from 'vue-nocaptcha/lib/nocaptcha.js'
export default {
    components: {
        nocaptcha
    }
}
```

## Single Desktop version

```js
import nocaptcha from 'vue-nocaptcha/lib/nocaptcha_pc.js'
export default {
    components: {
        nocaptcha
    }
}
```

## Single Mobile version

```js
import nocaptcha from 'vue-nocaptcha/lib/nocaptcha_h5.js'
export default {
    components: {
        nocaptcha
    }
}
```

## Usage

### base usage

```html
<nocaptcha
  :appkey="'FFFF00000000016AB730'"
  :scene="'test'"
  @callback="getToken"
></nocaptcha>
```

#### *desktop and h5 set*
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

#### *as component (suggest)*

```js
import { nocaptcha } from 'vue-nocaptcha'
export default {
    components: {
        nocaptcha
    }
}
```

#### *as global component*

```js
import Vue from 'vue'
import nocaptcha from 'vue-nocaptcha'
Vue.use(nocaptcha)
```

#### *pc/h5 version control*

*Normally, it can be control automatic.*

Maybe, you need control it yourself.

```html
<nocaptcha
  :h5="isMobile()"
></nocaptcha>
```

*NOTE: no h5 prop in single PC/H5 version*

### more

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
