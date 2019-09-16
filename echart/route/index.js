const fs = require('fs')

const sendHtml = (path, response) => {
    let options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

const index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        // let path = 'blog_index.html'
        let path = 'echart.html'
        sendHtml(path, response)
    }
}

const routes = [
    index,
]

module.exports.routes = routes
