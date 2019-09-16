const fs = require('fs')
const request = require('syncrequest')
const cheerio = require('cheerio')
const log = console.log.bind(console)

class House {
    constructor() {
        this.bedroom = ''
        this.area = ''
        this.totalPrice = ''
        this.unitPrice = ''
        this.unitPrice = ''
        this.place = ''

    }
}


const houseFromDiv = (div) => {
    let e = cheerio.load(div)
    let house = new House()
    let inf = e('.details-item').text().split('\n')[1].slice(16)
    inf.split('|')
    house.bedroom = inf.split('|')[0].slice(0)
    house.area = inf.split('|')[1]
    house.totalPrice = e('.price-det').text()
    house.unitPrice = e('.unit-price').text()
    house.place = e('.details-item').text().split('\n')[5].slice(20).split('-')[0]
    // log('inf',`(${inf})`)

    return house
}

const ensurePath = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}

const cachedUrl = (url) => {
    let path = 'cached_html'
    ensurePath(path)
    let cacheFile = path + '/' + url.split('/')[4].slice(1)+ '.html'
    let exists = fs.existsSync(cacheFile)
    if (exists) {
        let data = fs.readFileSync(cacheFile)
        return data
    } else {
        let r = request.get.sync(url)
        let body = r.body
        fs.writeFileSync(cacheFile, body)
        return body
    }
}

//得到house 的 数组
const housesFromUrl = (url) => {
    let body = cachedUrl(url)
    let e = cheerio.load(body)

    let houseDivs = e('.list-item')
    let houses = []
    for (let i = 0; i < houseDivs.length; i++) {
        let div = houseDivs[i]
        let m = houseFromDiv(div)
        houses.push(m)
    }
    return houses
}

const saveMovie = (movies) => {
    let s = JSON.stringify(movies, null, 2)
    let path = 'house.json'
    fs.writeFileSync(path, s)
}

const __main = () => {
    let houses = []
    for (let i = 0; i < 11; i++) {
        let start = i
        let url = `https://beijing.anjuke.com/sale/p${start}/#filtersort`
        let housesInPage = housesFromUrl(url)
        houses = [...houses, ...housesInPage]
    }
    saveMovie(houses)
    // downloadCovers(houses)
    log('抓取成功, 数据已经写入到 house.json 中')
}

__main()
