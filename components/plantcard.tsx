import React from 'react';
import styles from './PlantCard.module.css';
// import moment from 'moment';

import { ref, set } from "firebase/database";
import { database } from '@/common/config'

type Plant = {
  name: string,
  plant_type: string,
  last_watered: string,
  water_interval: number,
  last_pokon: string,
  pokon_interval: number,
  sun_required: string,
};

function updatePlantData(plant:Plant) {
  set(ref(database, 'plants/' + plant.name), {
    plant_type: plant.plant_type,
    last_watered: plant.last_watered,
    water_interval: plant.water_interval,
    last_pokon: plant.last_pokon,
    pokon_interval: plant.pokon_interval,
    sun_required: plant.sun_required,
  });
}

type PlantData = {
  plantData:{
    name: string,
    plant_type: string,
    last_watered: string,
    water_interval: number,
    last_pokon: string,
    pokon_interval: number,
    sun_required: string,
  }
};

function PlantCard(plant:PlantData) {
  const plantData = plant.plantData

  const [nextPokon, setNextPokon] = React.useState(plantData.pokon_interval - (new Date().getTime() - new Date(plantData.last_pokon).getTime()));
  const [nextWater, setNextWater] = React.useState(plantData.water_interval - (new Date().getTime() - new Date(plantData.last_watered).getTime()));
  const [lastWatered, setLastWatered] = React.useState(plantData.last_watered);
  const [lastPokon, setLastPokon] = React.useState(plantData.last_pokon);


  function updateWater() {
    const newPlantData = plantData
    newPlantData.last_watered = new Date().toISOString();
    
    setNextWater(plantData.water_interval)
    setLastWatered(new Date().toISOString());
    updatePlantData(newPlantData);
  }
  
  function updatePokon() {
    const newPlantData = plantData
    newPlantData.last_pokon = new Date().toISOString();

    setNextPokon(plantData.pokon_interval)
    setLastPokon(new Date().toISOString())
    updatePlantData(newPlantData);
  }

  return (
      <div className={styles.card}>
        <h2>{plantData.name}</h2>
        <div className={styles.row}>
          <div className={styles.plantinfo}>{plantData.plant_type}</div>
          <div className={styles.plantstatus}>Last Drinkies: {new Date(lastWatered).toUTCString()}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.plantinfo}>Required Water: Every {plantData.water_interval/(1000*60*60*24)} days</div>
          <div className={styles.plantstatus}>Next Drinkies: {Math.round(nextWater/(1000*60*60*24))} days</div>
        </div>
        <div className={styles.row}>
          <div className={styles.plantinfo}>Required Pokon: Every {plantData.pokon_interval/(1000*60*60*24)} days</div>
          <div className={styles.plantstatus}>Last Pokon: {new Date(lastPokon).toUTCString()}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.plantinfo}>Required Sunlight: {plantData.sun_required}</div>
          <div className={styles.plantstatus}>Next Foodies: {Math.round(nextPokon/(1000*60*60*24))} days</div>
        </div>
        <button className = {styles.button} onClick={updateWater}>
          I watered this plant!
        </button>
        <button className = {styles.button} onClick={updatePokon}>
          I pokon-ed this plant!
        </button>
      </div>
  );
};

export default PlantCard;