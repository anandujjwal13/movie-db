const db = require('./sequelize.js')
const axios = require('axios')

const providers = ['https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks']



function populateDB() {
    axios.get(providers[0])
        .then((movies) => {
            movies.data.forEach((movie) => {
                db.insert(movie.movieName, movie.releaseDate, providers[0].split('/')[3])
                    .catch(function(dberror) {
                        console.log(dberror)
                    })
            })
        }).then(() => {
            axios.get(providers[1])
                .then((movies) => {
                    movies.data.forEach((movie) => {
                        db.insert(movie.movieName, movie.releaseDate, providers[1].split('/')[3])
                            .catch(function(dberror) {
                                console.log(dberror)
                            })
                    })
                })
        }).then(() => {
            axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')
                .then(function(response) {
                    const actors = response.data
                    actors.forEach((actor) => {
                        let actorMovies = actor.movies
                        actorMovies.forEach((actorMovie) => {
                            db.updateActors(actorMovie, actor.actorName).catch(function(dberror) {
                                console.log(dberror)
                            })
                        })
                    })
                })
                .catch(function(error) {
                    console.log(error)
                })
        })
        .catch(function(error) {
            console.log(error)
        })

}
populateDB()
    //module.exports = populateDB