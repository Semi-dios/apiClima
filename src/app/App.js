import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';
import WeatherMap from './components/WeatherMap';
import WeatherHistory from './components/WeatherHistory';
import { WEATHER_KEY } from './keys'

// Context
import { useIndexedDB } from 'react-indexed-db';





export default class App extends Component {

    state = {
        visible: false,
        hour: new Date().toLocaleTimeString(),
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: '',
        city: '',
        country: '',
        lat: '',
        lon: '',
        error: null
    }

    getWeather = async (e) => {
        e.preventDefault();
        this.setState({
            visible: false,
            hour: new Date().toLocaleTimeString(),
            temperature: '',
            description: '',
            humidity: '',
            wind_speed: '',
            city: '',
            country: '',
            lat: '',
            lon: '',
            error: null
        })
        const { city, country } = e.target.elements;


        const cityValue = city.value;
        const countryValue = country.value;



        if (cityValue && countryValue) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`
            const response = await fetch(url);
            let data = await response.json();

            if (data.cod === "404") {
                this.setState({ error: data.message })
            } else {
                this.localStoreCloud(data)
                this.setState({
                    visible: true,
                    hour: new Date().toLocaleTimeString(),
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    city: data.name,
                    country: data.sys.country,
                    icon: data.weather[0].icon,
                    lat: data.coord.lat,
                    lon: data.coord.lon,
                    error: null
                })
            }

        } else {
            this.setState({ error: 'Please enter a city and country' })
        }

    }

    localStoreCloud = (data) => {
        const { add } = useIndexedDB('climas');
        //const [person, setPerson] = useState();
        console.log('data', data)

        add({ city: data.name, country: data.sys.country, temperature: data.main.temp, humidity: data.main.humidity, lat: data.coord.lat, lng: data.coord.lon, hour: new Date().toLocaleTimeString() }).then(
            event => {
                console.log('ID Generated: ', event.target.result);
            },
            error => {
                console.log(error);
            }
        );


    }

    render() {
        return (
            <Router>
                <div className="container p-4">
                    <div className="wrapper"></div>
                    <nav className="navbar main-nav navbar-expand-lg  navbar-dark ">
                        <Link className="navbar-brand" to="/">Check weather</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ">
                                <li className="nav-item  custom-nav-item active">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="custom-nav-item nav-item">
                                    <Link className="nav-link" to="/history">History</Link>
                                </li>


                            </ul>

                        </div>
                    </nav>


                    <Switch>
                        <Route exact path="/">

                            <div className="row m-0 d-flex justify-content-center" id="viewLanding">
                                <div className="col-sm-12 col-lg-6 mb-3 pr-lg-2">
                                    <div className="card custom-card mb-4">
                                        <WeatherForm {...this.state} getWeather={this.getWeather} />
                                    </div>
                                    <WeatherInfo {...this.state} />


                                </div>
                                <div className="col-sm-12 col-lg-6  pl-lg-2 mb-3">
                                    <WeatherMap {...this.state} />
                                </div>
                            </div>


                        </Route>
                        <Route exact path="/history">
                            <div className="row m-0 d-flex justify-content-center" id="viewHistory">
                                <div className="col-sm-12  mb-3 ">
                                    <div className="card custom-card mb-4">
                                        <WeatherHistory></WeatherHistory>
                                    </div>
                                </div>

                            </div>

                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

