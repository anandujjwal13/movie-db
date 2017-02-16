const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://anandujjwal:lifeisawsm@localhost:5432/films')

const db = {
    read() {
        return sequelize.query('SELECT movieName , releaseDate , actors , studio FROM movies')
    },

    insert(movieName, releaseDate, studio) {
        let query = `INSERT INTO movies (movieName , releaseDate , studio) VALUES (:movieName , :releaseDate , :studio) returning movieName`
        return sequelize.query(query, { replacements: { movieName: movieName, releaseDate: releaseDate, studio: studio } })
    },
    updateActors(movieName, actor) {

        let query = `UPDATE movies SET actors = array_append(actors,'${actor}') WHERE movieName = '${movieName}' returning movieName`
        return sequelize.query(query)
    }

}

module.exports = db
    //UPDATE table SET array_field = array_append(array_field, 'new item') WHERE...