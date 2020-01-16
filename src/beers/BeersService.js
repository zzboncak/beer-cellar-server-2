const BeersService = {
    getAllBeers(knex) {
        return knex
            .select('*')
            .from('beers')
    },
    getById(knex, id) {
        return knex
            .select('*')
            .from('beers')
            .where('id', id)
            .first()
    },
};

module.exports = BeersService;