import originJSONP from 'jsonp'

// data：url 后面的参数
export default function jsonp(url, data, option) {
  // 如果没有?，则添加？，否则需要＆
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data) {
    // data[k] = undefined 则设为空
    let value = data[k] !== undefined ? data[k] : ''
    // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 如果不为空，则第一个'&'删去
  return url ? url.substring(1) : ''
}












