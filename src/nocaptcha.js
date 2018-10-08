import { isMobile, getLang } from './utils'
import ncpc from './ali/nc'
import nch5 from './ali/nch5'
import version from './ali/version'

const Static = {
  type: Boolean,
  default: false
}

const MixSetting = {
  type: [String, Object],
  validator (set) {
    return (typeof set === 'string' && set.length > 0) ||
    (
      typeof set === 'object' &&
      (
        (set.hasOwnProperty('pc') && set.pc.length > 0) ||
        (set.hasOwnProperty('h5') && set.h5.length > 0)
      )
    )
  },
  required: true
}

export default {
  name: 'NoCAPTCHA',
  template: '<div :id="this.id"/>',
  data () {
    return {
      version,
      nc: null,
      id: `nc-${parseInt(Math.random() * 1000000000)}`
    }
  },
  props: {
    appkey: MixSetting,
    scene: MixSetting,
    aeis: Static,
    https: Static,
    h5: {
      type: Boolean,
      default: isMobile
    },
    lang: {
      type: String,
      default: 'en'
    }
  },
  created () {
    // check install
    if (!window.noCaptcha && !window.NoCaptcha) {
      // install
      (!this.h5 ? ncpc : nch5)(this.aeis, this.https)
    }
    // @load
    this.$emit('load')
  },
  mounted () {
    const getProps = () => {
      const props = this
      const { lang, h5 } = props
      const get = function (name) {
        if (typeof props[name] === 'object') {
          if (h5) {
            return props[name]['h5'] || (() => {
              console.warn(`[Vue-noCAPTCHA] Can not find H5-${name} preset in H5 mode, use PC preset instead.`)
              return props[name]['pc']
            })()
          } else {
            return props[name]['pc'] || (() => {
              console.warn(`[Vue-noCAPTCHA] Can not find PC-${name} preset in PC mode, use H5 preset instead.`)
              return props[name]['h5']
            })()
          }
        } else {
          return props[name]
        }
      }
      return {
        appkey: get('appkey'),
        scene: get('scene'),
        h5,
        lang: getLang(lang)
      }
    }
    // init
    const { appkey, scene, h5, lang } = getProps()
    const token = `${appkey}:${(new Date()).getTime()}:${Math.random()}`
    const noCaptcha = window.noCaptcha || window.NoCaptcha
    const init = h5 ? noCaptcha.init : noCaptcha
    const nc = this.nc = init({
      renderTo: `#${this.id}`,
      appkey: appkey,
      scene: scene,
      token: token,
      language: lang,
      callback: ({ csessionid, sig }) => {
        this.$emit('callback', {
          csessionid: csessionid,
          sig: sig,
          token: token,
          scene: scene,
          nc: nc
        })
      },
      error: (err) => {
        this.$emit('error', err)
      }
    })
    if (this.h5) {
      noCaptcha.setEnabled(true)
    }
    nc.reset()
  },
  destroyed () {
    if (this.nc && this.nc.destroy) {
      this.nc.destroy()
    }
  },
  render (h) {
    return h(
      'div',
      {
        attrs: {
          id: this.id
        }
      }
    )
  }
}
