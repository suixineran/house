const fs = require('fs')

const houseFilePath = '../house.json'

const loadhouses = () => {
    let content = fs.readFileSync(houseFilePath, 'utf8')
    let houses = JSON.parse(content)
    return houses
}

const b = {
    all: loadhouses(),
}

module.exports = b
