function pushEl(parent, tag, options) {
  var el = document.createElement(tag)

  for(var i = 0; i < Object.keys(options).length; i++) {
    el[Object.keys(options)[i]] = options[Object.keys(options)[i]]
  }

  parent.appendChild(el)
}

function init() {

}