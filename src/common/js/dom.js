export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// DOM对象，className
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  // 如果类名不在，则添加进去
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
