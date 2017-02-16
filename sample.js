const axios = require('axios')

const providers = ['https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks']
const actors = ['https://movie-api-lyalzcwvbg.now.sh/actors']

const sources = {
    providers,
    actors
}

const moviesStore = {}
    //const actors = {}

function populateActors() {

    axios.get('https://movie-api-lyalzcwvbg.now.sh/actors')
        .then(function(response) {
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
}
//populateActors()

function populateMovies(callback) {
    providers.forEach((provider) => {

        axios.get(provider)
            .then((movies) => {
                const movieObject = {}
                movies.data.forEach((movie) => {


                    movieObject.movieName = movie.movieName
                    movieObject.releaseDate = movie.releaseDate
                    movieObject.studio = provider.split('/')[3]
                    console.log(movieObject)

                })
                return movieObject
            }).then((movieObject) => {
                movieObject.actors = []
                moviesStore[movieObject.movieName] = movieObject


            })
            .catch(function(error) {
                console.log(error)
            })

    })


}
populateMovies((moviesStore) => {
    console.log(moviesStore)
})












module.exports = sources