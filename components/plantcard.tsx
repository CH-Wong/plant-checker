import React from 'react';
import styles from './PlantCard.module.css';
// import moment from 'moment';
let options = {  
  year: "numeric", month: "long",  
  day: "numeric", hour: "2-digit", minute: "2-digit"  
};  

export default function PlantCard(plantData:Object) {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const plant = {
    name: "Plant Name",
    plant_type: "Plant Type",
    last_watered: new Date(),
    watering_interval: 1000,
    last_pokon: new Date(),
    pokon_interval: 1000,
    sun_requirements: "Sun Requirements",
  } 

  function updateWater() {
    const last_watered = new moment().format();
    setCurrentDate(new Date());

    axios.patch(process.env.REACT_APP_API + `/api/plants/${name}/`,
    {
      "name": plantData.name,
      "last_watered": last_watered
    },
    {
      headers: { 'Content-type': 'application/json' }
    });
    
  }

  function updatePokon(){
    const last_pokon = new moment().format();
    setCurrentDate(new Date());

    axios.patch(process.env.REACT_APP_API + `/api/plants/${name}/`,
    {
      "name": plantData.name,
      "last_pokon": last_pokon
    },
    {
      headers: { 'Content-type': 'application/json' }
    });
    
  }



    return (
        <div className={styles.card}>
          <h2>{plantData.name}</h2>
          <div className={styles.row}>
            <div className={styles.plantinfo}>{plantData.plant_type}</div>
            <div className={styles.plantstatus}>Last Drinkies: {plantData.last_watered.toLocaleString("en-gb", options)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.plantinfo}>Required Water: {plantData.watering_interval/(1000*60*60*24)}</div>
            <div className={styles.plantstatus}>Next Drinkies: {calculate_interval(plantData.last_watered.getTime() + (parseInt(plantData.watering_interval)*1000) - currentDate)}
            </div>
          
          </div>
          <div className={styles.row}>
            <div className={styles.plantinfo}>Required Pokon: {plantData.pokon_interval/(1000*60*60*24)}</div>
            <div className={styles.plantstatus}>Last Pokon: {plantData.last_pokon.toLocaleString("en-gb", options)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.plantinfo}>Required Sunlight: {plantData.sun_requirements}</div>
            <div className={styles.plantstatus}>Next Pokon: {calculate_interval(state.last_pokon.getTime() + (parseInt(plantData.pokon_interval)*1000) - currentDate)}</div>
          </div>
          <button className = {styles.button} onClick={updateWater}>
            I watered this plant!
          </button>
          <button className = {styles.button} onClick={updatePokon}>
            I pokon'ed this plant!
          </button>
        </div>
    );
};

function calculate_interval(total_seconds:number){
  var seconds = Math.floor(total_seconds)/1000;
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  var days = Math.floor(hours/24);
  
  hours = Math.floor(hours-(days*24));
  minutes = Math.floor(minutes-(days*24*60)-(hours*60));
  seconds = Math.floor(seconds-(days*24*60*60)-(hours*60*60)-(minutes*60));
  return `${days}days, ${hours}hours, ${minutes}minutes, ${seconds}seconds`
}