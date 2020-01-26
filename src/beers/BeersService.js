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
    addBeer(knex, beerToAdd) {
        return knex
            .insert(beerToAdd)
            .into('beers')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    deleteBeer(knex, beerId) {
        return knex('beers')
            .where('id', beerId)
            .delete()
    }
};

module.exports = BeersService;