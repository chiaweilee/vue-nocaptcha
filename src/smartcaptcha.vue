<template>
  <div :id="id"/>
</template>

<script>
import VueScript2 from 'vue-script2'

const url = {
  g: {
    base: '//g.alicdn.com/sd/nvc/1.1.112/guide.js?t=2015052012',
    pc: '//g.alicdn.com/sd/smartCaptcha/0.0.1/index.js'
  },
  aeis: {
    base: '//aeis.alicdn.com/sd/nvc/1.1.112/guide.js?t=2015052012',
    pc: '//aeis.alicdn.com/sd/smartCaptcha/0.0.1/index.js'
  }
}

export default {
  data () {
    return {
      sc: undefined,
      id: 'sc' + parseInt(Math.random() * 1000000)
    }
  },
  props: {
    h5: {type: Boolean, default: false},
    appkey: {type: String, required: true},
    scene: {type: String, required: true},
    // eslint-disable-next-line
    h5scene: {type: String},
    aeis: {type: Boolean, default: false},
    lang: {type: String, default: 'en'},
    option: {type: Object, default: function () { return {} }}
  },
  mounted () {
    this._setOpt()
    this._loadJs()
  },
  destroyed () {
    if (this.sc && this.sc.destroy) {
      this.sc.destroy()
    }
  },
  methods: {
    _loadJs () {
      const _this = this
      if (window.smartCaptcha) {
        _this._initCaptcha()
        _this.$emit('load')
      } else {
        VueScript2.load(url[!this.aeis ? 'g' : 'aeis']['base'])
          .then(function () {
            VueScript2.load(url[!_this.aeis ? 'g' : 'aeis']['pc'])
              .then(function () {
                _this._initCaptcha()
                _this.$emit('load')
              })
          })
      }
    },
    _setOpt () {
      const option = this.option || {}
      const ncScene = this.h5 ? this.h5scene : this.scene
      window.NVC_Opt = {
        appkey: this.appkey,
        scene: ncScene,
        renderTo: '#' + this.id,
        elements: option.elements || [
          '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png',
          '//img.alicdn.com/tfs/TB17cwllsLJ8KJjy0FnXXcFDpXa-50-74.png'
        ],
        bg_back_prepared: option.bg_back_prepared || '//img.alicdn.com/tps/TB1skE5SFXXXXb3XXXXXXXXXXXX-100-80.png',
        bg_front: option.bg_front || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABQCAMAAADY1yDdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefk5w+ruswAAAAfSURBVFjD7cExAQAAAMKg9U9tCU+gAAAAAAAAAIC3AR+QAAFPlUGoAAAAAElFTkSuQmCC',
        obj_ok: option.obj_ok || '//img.alicdn.com/tfs/TB1rmyTltfJ8KJjy0FeXXXKEXXa-50-74.png',
        bg_back_pass: option.bg_back_pass || '//img.alicdn.com/tfs/TB1KDxCSVXXXXasXFXXXXXXXXXX-100-80.png',
        obj_error: option.obj_error || '//img.alicdn.com/tfs/TB1q9yTltfJ8KJjy0FeXXXKEXXa-50-74.png',
        bg_back_fail: option.bg_back_fail || '//img.alicdn.com/tfs/TB1w2oOSFXXXXb4XpXXXXXXXXXX-100-80.png',
        upLang: option.upLang || {
          'cn': {
            _ggk_guide: '请在屏幕上滑动，刮出两面盾牌',
            _ggk_success: '恭喜您成功刮出盾牌<br/>继续下一步操作吧',
            _ggk_loading: '加载中',
            _ggk_fail: ['呀，盾牌不见了<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],
            _ggk_action_timeout: ['我等得太久啦<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],
            _ggk_net_err: ['网络实在不给力<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题'],
            _ggk_too_fast: ['您刮得太快啦<br/>请', 'javascript:noCaptcha.reset()', '再来一次', '或', 'http://survey.taobao.com/survey/QgzQDdDd?token=%TOKEN', '反馈问题']
          }
        }
      }
    },
    _initCaptcha () {
      const _this = this
      const option = this.option || {}
      // eslint-disable-next-line
      this.sc = new window.smartCaptcha({
        renderTo: '#sc',
        width: option.width || 300,
        height: option.height || 42,
        default_txt: option.default_txt || '点击按钮开始智能验证',
        success_txt: option.success_txt || '验证成功',
        fail_txt: option.fail_txt || '验证失败，请在此点击按钮刷新',
        scaning_txt: option.scaning_txt || '智能检测中',
        success: function (data) {
          _this.$emit('callback', data)
        }
      })
      this.sc.init()
    }
  }
}
</script>
