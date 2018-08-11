const fs = require('fs')
const path = require('path')
const http = require('http')

const handle = function (name, s) {
  // refactor to module
  s = s.replace(/(!)(function)\(\)({)/, 'export default /*$1*/$2(_aeis_, _https_)$3')
  s = s.replace(/(})(\(\))(;)$/, '$1/*$2*/$3')
  // refactor for g/aeis
  s = s.replace(/(url\("\/\/)g(\.alicdn)/gi, '$1\'+(_aeis_?\'aeis\':\'g\')+\'$2') // css
  s = s.replace(/("\/\/)g(\.alicdn)/gi, '$1"+(_aeis_?"aeis":"g")+"$2') // js
  // refactor to https
  s = s.replace(/([^url(]")(\/\/)(([^.|^/]+\.)+[^.|^/])/g, '$1"+(_https_?"https:":"")+"$2$3') // [^url(], except css
  console.log(name + '.js updated! ' + /(^.+)/.exec(s)[1]) // version
  fs.writeFileSync(path.resolve('src/' + name + '.js'), s)
}

// nc.js
http.get('http://g.alicdn.com/sd/ncpc/nc.js', function (response) {
  response.setEncoding('utf8')
  let s = ''
  response.on('data', function (chunk) {
    s += chunk
  })
  response.on('end', function () {
    handle('nc', s)
  })
})

// nch5.js
http.get('http://g.alicdn.com/sd/nch5/index.js', function (response) {
  response.setEncoding('utf8')
  let s = ''
  response.on('data', function (chunk) {
    s += chunk
  })
  response.on('end', function () {
    handle('nch5', s)
  })
})
