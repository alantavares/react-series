import React, { Component } from 'react'
import api from './Api'
import { statuses } from './NewSeries'
import { Link } from 'react-router-dom'

class Series extends Component{

    constructor(props){
        super(props)

        this.state = {
            series: [],
            isLoading: false
        }

        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
    }
        
    componentDidMount(){
        this.loadData()    
    }

    loadData() {
        this.setState({isLoading:true})
        api.loadSeriesByGenre(this.props.match.params.genre).then( (res) => {
          this.setState({
            isLoading:false,
            series : res.data
          })
        })
    }

    deleteSeries(id){
        api.deleteSeries(id)
            .then( (res) => this.loadData() )
            .catch( () => alert("Ops, algo deu errado. Tente novamente mais tarde"))
    }

    renderSeries(series){
        return (
            <div className="item  col-xs-4 col-lg-4" key={series.id}>
                <div className="thumbnail">
                    <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                    <div className="caption">
                    <h4 className="group inner list-group-item-heading">
                        {series.name}
                    </h4>
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                        <p className="lead">
                        {series.genre} / { statuses[ series.status ] }</p>
                        </div>
                        <div className="col-xs-12 col-md-12">
                        <Link to={'/series-edit/'+series.id} className="btn btn-success">Editar</Link>
                        <a className="btn btn-success" onClick={ () => this.deleteSeries( series.id ) }>Excluir</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <section id="intro" className="intro-section">
                <h1>Séries da categoria {this.props.match.params.genre}</h1>
                <div id="series" className="row list-group">
                    {
                    this.state.isLoading && 
                    <span>Aguarde, carregando...</span>
                    }
                    {
                    !this.state.isLoading &&
                    this.state.series.length === 0 && 
                        <div class='alert alert-info'>Nenhuma série cadastrada.</div>
                    }
                    {
                    !this.state.isLoading && 
                    this.state.series.map( this.renderSeries)
                    }
                </div>

            </section>
        )
    }
}

export default Series