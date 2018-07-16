<template>
  <div :id="id"/>
</template>

<script>
import getLang from './lang'
import VueScript2 from 'vue-script2'

const url = {
  g: {
    pc: '//g.alicdn.com/sd/ncpc/nc.js?t=1497440454594',
    h5: '//g.alicdn.com/sd/nch5/index.js?t=1497436353263'
  },
  aeis: {
    pc: '//aeis.alicdn.com/sd/ncpc/nc.js?t=1497440454594',
    h5: '//aeis.alicdn.com/sd/nch5/index.js?t=1497436353263'
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
    h5: {type: Boolean, default: false},
    appkey: {type: String, required: true},
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
        // not load
        // TODO issue in h5
        // url[!this.aeis ? 'g' : 'aeis'][!this.h5 ? 'pc' : 'h5']
        VueScript2.load(url[!this.aeis ? 'g' : 'aeis']['pc'])
          .then(function () {
            _this._initCaptcha()
            _this.$emit('load')
          })
      }
    },
    _initCaptcha () {
      const _this = this
      const lang = getLang(this.lang)
      const ncToken = [this.appkey, (new Date()).getTime(), Math.random()].join(':')
      const noCaptcha = window.noCaptcha || window.NoCaptcha
      const ncScene = this.h5 ? this.h5scene : this.scene
      const nc = noCaptcha({
        renderTo: '#' + _this.id,
        appkey: this.appkey,
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
      }).reset()
    }
  }
}
</script>
