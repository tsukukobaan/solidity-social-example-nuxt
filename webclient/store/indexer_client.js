const http = require('http')

export {
  getIndexed
}

function getIndexed(type) {
  return new Promise((resolve, reject) => {
    function reqListener () {
      console.log('getIndexed')
      if (this.status == 200) {
        const result = JSON.parse(this.responseText).hits.hits
        resolve(result.map(result => result._source))
      } else {
        reject(Error('No results'))
      }
    }

    let oReq = new XMLHttpRequest()
    oReq.addEventListener('load', reqListener)
    oReq.open('GET', `http://localhost:8081/${type}`)
    oReq.send()
  })
}
