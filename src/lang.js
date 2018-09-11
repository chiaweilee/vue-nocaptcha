var langs = {
  pc: [
    'ar_SA', // 阿拉伯文
    'de_DE', // 德文
    'es_ES', // 西班牙文
    'fr_FR', // 法文
    'in_ID', // 印尼语
    'it_IT', // 意大利文
    'iw_HE', // 希伯来语
    'ja_JP', // 日文
    'ko_KR', // 韓文
    'nl_NL', // 荷蘭文
    'pt_BR', // 波蘭文
    'ru_RU', // 俄文
    'th_TH', // 泰文
    'tr_TR', // 土耳其文
    'vi_VN', // 越南文
    'cn', // 简体中文
    'tw', // 繁体中文
    'en' // 英文
  ],
  h5: [
    'cn', // 简体中文
    'tw', // 繁体中文
    'en' // 英文
  ]
}

var more = {
  'ar-ae': 'ar_SA',
  'zh-cn': 'cn',
  'zh-tw': 'tw'
}

var getLang = function (lang, isH5/* = false, issue IE ES5 */) {
  lang = more[lang] || lang
  if (langs[!isH5 ? 'pc' : 'h5'].indexOf(lang) > -1) return lang
  console.warn('[Vue-NoCaptcha] No support lang package for \'' + lang + '\', use \'en\' instead.')
  return 'en'
}

export default getLang
