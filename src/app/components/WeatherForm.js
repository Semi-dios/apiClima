import React from 'react'



const WeatherForm = props=> {
    return(
        <div className="card-body" >
            <form onSubmit={props.getWeather} action="">
                <div className="form-row">
                    <div className="form-group mb-3 col-sm-12">
                    {props.error &&
                        <div className="col-sm-12">
                            <div className="custom-alert custom-alert-danger">
                                {props.error}
                            </div>
                        </div>
                    }
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group mb-3 col-sm-12">
                        <input type="text" name="city" placeholder="Your city name" id="" className="form-control" autoFocus/>
                    </div>
                    <div className="form-group  mb-3 col-sm-12">
                        <input type="text" name="country" placeholder="Your country name" id="" className="form-control" autoFocus/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group mb-3 col-sm-12">
                        <button className="custom-btn custom-btn-primary d-flex justify-content-center">
                            Get Weather
                        </button>
                    </div>      
                </div>    
            </form>
        </div>
    )
}


export default WeatherForm; 