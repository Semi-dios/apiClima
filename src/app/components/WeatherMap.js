import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <h2>{text}</h2>;

export default function SimpleMap(props) {
    console.log(props)
    return (
        <div>
            { props.visible ?
                <div className="card">
                    <div className="map" style={{ height: '450px', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={297142083038}
                            defaultCenter={
                                {
                                    lat: Number(props.lat),
                                    lng: Number(props.lon)
                                }
                            }
                            defaultZoom={props.zoom}
                        >
                            <AnyReactComponent
                                lat={props.lat}
                                lng={props.lon}
                                text={props.city}
                            />
                        </GoogleMapReact>
                    </div>
                </div> : ""
            }
        </div>

    )
}


SimpleMap.defaultProps = {

    zoom: 11
}

