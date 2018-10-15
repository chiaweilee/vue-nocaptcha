import Static from './static'
import MixSetting from './mix-setting'
import RequiredString from './required-string'
import isMobile from '../utils/isMobile'

const single = {
  appkey: RequiredString,
  scene: RequiredString,
  aeis: Static,
  https: Static,
  lang: {
    type: String,
    default: 'en'
  }
}

const mix = {
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
}

export {
  single,
  mix
}

export default {
  appkey: MixSetting,
  scene: MixSetting,
  aeis: Static,
  https: Static,
  lang: {
    type: String,
    default: 'en'
  }
}
