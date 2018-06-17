import React, { Component } from 'react'
import api from './Api'
import { Redirect } from 'react-router-dom'
import { statuses } from './NewSeries'

class EditSeries extends Component{

    constructor(props){
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect : false,
            series:{}
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
        
    componentDidMount(){
        this.setState({isLoading:true})
        api.loadSeriesById( this.props.match.params.id).then( (res) => {
            console.log(res.data);
            this.setState({
                isLoading:false,
                series : res.data
            })
            this.refs.name.value = this.state.series.name
            this.refs.genre.value = this.state.series.genre
            this.refs.comments.value = this.state.series.comments
            this.refs.status.value = this.state.series.status
        })
        api.loadGenres().then( (res) => {
          this.setState({
            isLoading:false,
            genres : res.data
          })
        })
    }

    saveSeries(){
        
        const newSeries ={
            'id' : this.props.match.params.id,
            'name' : this.refs.name.value,
            'status' : this.refs.status.value,
            'genre' : this.refs.genre.value,
            'comments' :this.refs.comments.value
        }

        api.updateSeries(newSeries).then( (res) => {
            this.setState({
                redirect : '/series/'+newSeries.genre
            })
          })

        

    }

    render(){
        return (            
            <section className="intro-section">
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Editar Série</h1>
                <form>
                    Nome: <input type="text" ref='name' defaultValue={this.state.series.name} className='form-control' /><br />
                    Status: 
                    <select ref='status'>
                        { Object.keys(statuses).map( key => <option key={key} value={key}>{ statuses[key] }</option> ) }
                    </select>
                    <br />
                    Gênero: 
                    <select ref='genre'>
                        { this.state.genres.map( key => <option key={key} value={key}>{ key }</option> ) }
                    </select>
                    <br />
                    Commentários: <textarea ref='comments' className='form-control'>{this.state.series.comments}</textarea><br />
                    <button type="button" onClick={this.saveSeries}>Salvar</button>
                </form>
            </section>
        )
    }
}


export default EditSeries
