import React, { Component } from 'react';
import { useIndexedDB } from 'react-indexed-db';

export default class WeatherHistory extends Component {

    state = {
        climas: [],
    }

    ShowAll = () => {
        const { getAll } = useIndexedDB('climas');

        getAll().then(climasFromDB => {
            this.setState({
                climas: climasFromDB,
            })
        })

        console.log(this.state.climas)

    }

    componentDidMount() {
        setInterval(
            () => this.ShowAll(),
            5000
        );


    }
    render() {
        return (

            <div className="row" >
                {this.state.climas.length > 0 ?
                    <div className="col-sm-12">
                        <div className="card hydrogen-card ">
                            <div className="card-content">
                                <table className="table" >
                                    <thead>
                                        <tr >
                                            <th >#</th>
                                            <th >City</th>
                                            <th >Country</th>
                                            <th >Temperature</th>
                                            <th >Humidity</th>
                                            <th >Hour</th>
                                        </tr>
                                    </thead>
                                    {this.state.climas.map(d =>

                                        <tbody key={d.id}>
                                            <tr >
                                                <th >{d.id}</th>
                                                <th >{d.city}</th>
                                                <th >{d.country}</th>
                                                <th >{d.temperature}</th>
                                                <th >{d.humidity}</th>
                                                <th >{d.hour}</th>
                                            </tr>

                                        </tbody>


                                    )}
                                </table>



                            </div>
                        </div>
                    </div> : ""}
            </div>


        )
    }
}