const house = require('../model/house')

const all = {
    path: '/api/house/all',
    method: 'get',
    func: (request, response) => {
        let houses = house.all
        let r = JSON.stringify(houses)
        response.send(r)
    }
}

const routes = [
    all,
]

module.exports.routes = routes
