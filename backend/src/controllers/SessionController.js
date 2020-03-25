const connection = require('../database/connection')

module.exports = {
    async create(req,res){
        const { id } = request.body

        const ong_id = await connection('ongs')
        .where('id', id)
        .name('name')
        .first()

        if(!ong){
            return res.status(400).json({error: 'No ONG found with this ID'})
        }
    }
}