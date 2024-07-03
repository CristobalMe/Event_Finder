import { Map, GoogleApiWrapper} from "google-maps-react"
import { Component } from "react"

class MapContainer extends Component {
    render() {
      return(
          <div className="flex">
            <Map 
              google = {this.props.google}
              style = {{width: "24rem", height: "15rem"}}
              zoom = {10}
              initialCenter = {
                {
                    lat: this.props.latitude,
                    lng: this.props.longitude
                }
              }
            />
          </div>
        
      );
    }
    
};

export default GoogleApiWrapper({
    apiKey: import.meta.env.VITE_MAPS_API_KEY
})(MapContainer)
