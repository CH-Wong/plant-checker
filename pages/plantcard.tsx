import React, { useState, useEffect } from 'react';
import styles from './PlantCard.module.css';
import axios from 'axios';
import moment from 'moment';
let options = {  
  year: "numeric", month: "long",  
  day: "numeric", hour: "2-digit", minute: "2-digit"  
};  

export default class PlantCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current_date: new Date(),
        plant: props.plant,
        last_watered: new Date(props.plant.last_watered),
        last_pokon: new Date(props.plant.last_pokon),
      };
  }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        current_date: new Date()
      });
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

    updateWater(){
        const name = this.state.plant.name;
        const last_watered = new moment().format();
        axios.patch(process.env.REACT_APP_API + `/api/plants/${name}/`,
        {
          "name": name,
          "last_watered": last_watered
        },
        {
          headers: { 'Content-type': 'application/json' }
        });
        
        this.setState({
          last_watered: new Date()
        });
      }
      updatePokon(){
        const name = this.state.plant.name;
        const last_pokon = new moment().format();
        axios.patch(process.env.REACT_APP_API + `/api/plants/${name}/`,
        {
          "name": name,
          "last_pokon": last_pokon
        },
        {
          headers: { 'Content-type': 'application/json' }
        });
        
        this.setState({
          last_pokon: new Date()
        });
      }
      render() {
      return (
          <div className={styles.card}>
            <h2>{this.state.plant.name}</h2>
            <div className={styles.row}>
              <div className={styles.plantinfo}>{this.state.plant.plant_type}</div>
              <div className={styles.plantstatus}>Last Drinkies: {this.state.last_watered.toLocaleString("en-gb", options)}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.plantinfo}>Required Water: {this.state.plant.watering_interval_text}</div>
              <div className={styles.plantstatus}>Next Drinkies: {this.calculate_interval(this.state.last_watered.getTime() + (parseInt(this.state.plant.watering_interval)*1000) - this.state.current_date)}
              </div>
            
            
            </div>
            <div className={styles.row}>
              <div className={styles.plantinfo}>Required Pokon: {this.state.plant.pokon_interval_text}</div>
              <div className={styles.plantstatus}>Last Pokon: {this.state.last_pokon.toLocaleString("en-gb", options)}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.plantinfo}>Required Sunlight: {this.state.plant.sun_requirements}</div>
              <div className={styles.plantstatus}>Next Pokon: {this.calculate_interval(this.state.last_pokon.getTime() + (parseInt(this.state.plant.pokon_interval)*1000) - this.state.current_date)}</div>
            </div>
            <button className = {styles.button} onClick={this.updateWater.bind(this)}>
              I watered this plant!
            </button>
            <button className = {styles.button} onClick={this.updatePokon.bind(this)}>
              I pokon'ed this plant!
            </button>
          </div>
      );
    }
};