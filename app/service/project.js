module.exports = (app) => {
    const BaseService = require('./base')(app)
    return class ProjectService extends BaseService{
        async getList() {
            return [{
                name: 'project1',
                desc: 'project desc'
            }, {
                name: 'project2',
                desc: 'project desc2'
            }
            ]
        }
    }
}
