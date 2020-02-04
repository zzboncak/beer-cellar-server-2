const UsersService = {
    getUser(knex, username, password) {
        return knex
            .from('users')
            .select('id')
            .where({
                username: username,
                user_password: password
            })
            .first()
    }
}

module.exports = UsersService;