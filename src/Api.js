import axios from 'axios' 

const api = axios.create({
    baseURL : 'http://localhost:3001/'
})

const apis = {
    
    loadGenres: () => api.get('genres'),

    loadSeriesByGenre: (genre) => {
        return api.get('series?genre='+genre)
    },

    loadSeriesById: (id) => {
        return api.get('series/'+id)
    },

    updateSeries: (series) => {
        return api.put('series/'+series.id,series)
    },

    saveSeries: (newSeries) => {
        return api.post('series',newSeries)
    },

    deleteSeries : (id) => {
        return api.delete('series/'+id)
    }
}

export default apis