const fs = require('fs')
const resolve = require('path').resolve
const http = require('http')

const handle = function (name, s) {
  // refactor to module
  s = s.replace(/(!)(function)\(\)({)/, 'export default /*$1+v*/$2(_aeis_, _https_)$3')
  s = s.replace(/(})(\(\))(;)$/, '$1/*$2*/$3')
  // refactor for g/aeis
  s = s.replace(/(url\("\/\/)g(\.alicdn)/gi, '$1\'+(_aeis_?\'aeis\':\'g\')+\'$2') // css
  s = s.replace(/("\/\/)g(\.alicdn)/gi, '$1"+(_aeis_?"aeis":"g")+"$2') // js
  // refactor to https
  s = s.replace(/([^url(]")(\/\/)(([^.|^/]+\.)+[^.|^/])/g, '$1"+(_https_?"https:":"")+"$2$3') // [^url(], except css
  // update version
  const version = /(^.+)/.exec(s)[1]
  const versionFile = resolve(`src/ali/version.js`)
  console.log(`${name}.js updated! ${version}`) // version
  fs.writeFileSync(versionFile, fs.readFileSync(versionFile, 'utf-8').replace(new RegExp(`(${name}: ')[^']*(')`), `$1${version}$2`))
  // save file
  fs.writeFileSync(resolve(`src/ali/${name}.js`), s)
}

const update = function (name, url) {
  http.get(url, function (response) {
    response.setEncoding('utf8')
    let s = ''
    response.on('data', function (chunk) {
      s += chunk
    })
    response.on('end', function () {
      handle(name, s)
    })
  })
}

;[
  ['nc', 'http://g.alicdn.com/sd/ncpc/nc.js'],
  ['nch5', 'http://g.alicdn.com/sd/nch5/index.js']
].forEach(([name, url]) => {
  update(name, url)
})
