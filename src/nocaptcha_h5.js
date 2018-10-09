import getLang from './utils/getLang'
import nch5 from './ali/nch5'
import version from './ali/version'

const Static = {
  type: Boolean,
  default: false
}

const RequiredString = {
  type: String,
  required: true
}

export default {
  name: 'NoCAPTCHA',
  template: '<div :id="this.id"/>',
  data () {
    return {
      version: version.nch5,
      nc: null,
      id: `nc-${parseInt(Math.random() * 1000000000)}`
    }
  },
  props: {
    appkey: RequiredString,
    scene: RequiredString,
    aeis: Static,
    https: Static,
    lang: {
      type: String,
      default: 'en'
    }
  },
  created () {
    // check install
    if (!window.noCaptcha) {
      // install
      nch5(this.aeis, this.https)
    }
    // @load
    this.$emit('load')
  },
  mounted () {
    // init
    const { appkey, scene, lang } = this
    const token = `${appkey}:${(new Date()).getTime()}:${Math.random()}`
    const noCaptcha = window.noCaptcha || window.NoCaptcha
    const init = noCaptcha.init
    const nc = this.nc = init({
      renderTo: `#${this.id}`,
      appkey: appkey,
      scene: scene,
      token: token,
      language: getLang(lang),
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
    noCaptcha.setEnabled(true)
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
