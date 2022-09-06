import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PlantCard from "./components/PlantCard";
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

class App extends React.Component {
    constructor(props) {
      super(props);
      axios.get(process.env.REACT_APP_API + "/api/plants/")
      .then((response) => {
          console.log(response.data)
          this.setState({
              data: response.data
          });
      })
      .catch((error) => {
          console.log(error)
      })


      this.state = {
        data: [],
      };

  }
  
    componentDidMount() {
        console.log(this.state.data)
    }
  
    componentWillUnmount() {

    }

    calculate_interval(total_seconds){
      var seconds = Math.floor(total_seconds)/1000;
      var minutes = Math.floor(seconds/60);
      var hours = Math.floor(minutes/60);
      var days = Math.floor(hours/24);
      
      hours = Math.floor(hours-(days*24));
      minutes = Math.floor(minutes-(days*24*60)-(hours*60));
      seconds = Math.floor(seconds-(days*24*60*60)-(hours*60*60)-(minutes*60));

      return `${days}days, ${hours}hours, ${minutes}minutes, ${seconds}seconds`
    }
  

    render() {
      return (
        <div>
        <h1>Plant Status Checker</h1>
        {this.state.data.map(function(plant){
            return <PlantCard plant={plant} key={plant.name}/>
        })}
    </div>
      );
    }
};





root.render(
    <App/>
);