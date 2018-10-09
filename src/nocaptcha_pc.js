import getLang from './utils/getLang'
import ncpc from './ali/nc'
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
      version: version.nc,
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
      ncpc(this.aeis, this.https)
    }
    // @load
    this.$emit('load')
  },
  mounted () {
    // init
    const { appkey, scene, lang } = this
    const token = `${appkey}:${(new Date()).getTime()}:${Math.random()}`
    const init = noCaptcha = window.noCaptcha
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
