const mapper = require('../../mapper/index')
const SELECT_USER_BY_KEY = mapper.getModules('user').query('SELECT_USER_BY_KEY')
const userServices = {}

userServices.login = async (params) => {
    return await SELECT_USER_BY_KEY(params)
}

module.exports = userServices
