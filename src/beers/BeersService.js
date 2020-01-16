const BeersService = {
    getAllBeers(knex) {
        return knex
            .select('*')
            .from('beers')
    },
};

module.exports = BeersService;