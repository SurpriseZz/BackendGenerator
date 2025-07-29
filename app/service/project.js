module.exports = (app) => {
    return class ProjectService {
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
