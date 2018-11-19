import { single } from './props'
import template from './public/template'
import name from './public/name'
import render from './public/render'
import ncpc from './ali/nc'
import version from './ali/version'
import { getLang, setId } from './utils'

export default {
  name,
  template,
  data () {
    return {
      version: version.nc,
      nc: null,
      id: setId()
    }
  },
  props: single,
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
    const init = window.noCaptcha
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
  render
}
