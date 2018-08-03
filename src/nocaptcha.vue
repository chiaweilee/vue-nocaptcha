<template>
  <div :id="id"/>
</template>

<script>
import getLang from './lang'
import isMobile from './isMobile'
import VueScript2 from 'vue-script2'

const url = {
  g: {
    pc: '//g.alicdn.com/sd/ncpc/nc.js',
    h5: '//g.alicdn.com/sd/nch5/index.js'
  },
  aeis: {
    pc: '//aeis.alicdn.com/sd/ncpc/nc.js',
    h5: '//aeis.alicdn.com/sd/nch5/index.js'
  }
}

export default {
  data () {
    return {
      nc: undefined,
      id: 'nc' + parseInt(Math.random() * 1000000)
    }
  },
  props: {
    h5: {type: Boolean, default: isMobile()},
    appkey: {type: String, required: true},
    // eslint-disable-next-line
    h5appkey: {type: String},
    scene: {type: String, required: true},
    // eslint-disable-next-line
    h5scene: {type: String},
    aeis: {type: Boolean, default: false},
    lang: {type: String, default: 'en'}
  },
  mounted () {
    this._loadJs()
  },
  destroyed () {
    if (this.nc && this.nc.destroy) {
      this.nc.destroy()
    }
  },
  methods: {
    _loadJs () {
      const _this = this
      if (window.noCaptcha || window.NoCaptcha) {
        // loaded
        _this._initCaptcha()
        _this.$emit('load')
      } else {
        // not loaded
        VueScript2.load(url[!this.aeis ? 'g' : 'aeis'][!this.h5 ? 'pc' : 'h5'])
          .then(function () {
            _this._initCaptcha()
            _this.$emit('load')
          })
      }
    },
    _initCaptcha () {
      const _this = this
      const lang = getLang(this.lang, this.h5)
      const ncToken = [this.appkey, (new Date()).getTime(), Math.random()].join(':')
      const noCaptcha = window.noCaptcha || window.NoCaptcha
      const init = this.h5 ? noCaptcha.init : noCaptcha
      const appkey = this.h5 ? (this.h5appkey || this.appkey) : this.appkey
      const ncScene = this.h5 ? (this.h5scene || this.scene) : this.scene
      const nc = init({
        renderTo: '#' + _this.id,
        appkey: appkey,
        scene: ncScene,
        token: ncToken,
        language: lang,
        callback: function (data) {
          _this.$emit('callback', {
            csessionid: data.csessionid,
            sig: data.sig,
            token: ncToken,
            scene: ncScene,
            nc: nc
          })
        },
        error: function (err) {
          _this.$emit('error', err)
        }
      })
      this.h5 && noCaptcha.setEnabled(true)
      nc.reset()
    }
  }
}
</script>
