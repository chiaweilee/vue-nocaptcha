import { mix } from './props'
import template from './public/template'
import name from './public/name'
import render from './public/render'
import ncpc from './ali/nc'
import nch5 from './ali/nch5'
import version from './ali/version'
import getLang from './utils/getLang'
import warn from './utils/warn'

export default {
  name,
  template,
  data () {
    return {
      version,
      nc: null,
      id: `nc-${parseInt(Math.random() * 1000000000)}`
    }
  },
  props: mix,
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
              warn(`Can not find H5-${name} preset in H5 mode, use PC preset instead.`)
              return props[name]['pc']
            })()
          } else {
            return props[name]['pc'] || (() => {
              warn(`Can not find PC-${name} preset in PC mode, use H5 preset instead.`)
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
  render
}
