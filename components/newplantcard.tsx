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

function addPlant(plant:Plant) {
    set(ref(database, 'plants/' + plant.name), {
        plant_type: plant.plant_type,
        last_watered: plant.last_watered,
        water_interval: plant.water_interval,
        last_pokon: plant.last_pokon,
        pokon_interval: plant.pokon_interval,
        sun_required: plant.sun_required,
    });
    }


function NewPlantCard() {
  const [name, setName] = React.useState("");
  const [plantType, setPlantType] = React.useState("");
  const [sunRequired, setSunRequired] = React.useState("");
  const [waterInterval, setWaterInterval] = React.useState(0);
  const [pokonInterval, setPokonInterval] = React.useState(0);


  function handleAdd(event:React.FormEvent<HTMLFormElement>) {
    const newPlant:Plant = {
      name: name,
      plant_type: plantType,
      last_watered:new Date().toISOString(),
      water_interval: waterInterval*60*60*24,
      last_pokon: new Date().toISOString(),
      pokon_interval: pokonInterval*60*60*24,
      sun_required: sunRequired,
    }
    addPlant(newPlant);
  }

  return (
    <div className={styles.card}>
      <h2>Add New Plant</h2>
      <form onSubmit={handleAdd}>
          <input 
            name="name" 
            type="text" 
            placeholder="Plant Name" 
            onChange={e=>setName(e.target.value)}
          />

          <input 
            name="type" 
            type="text" 
            placeholder="Plant Type" 
            onChange={e=>setPlantType(e.target.value)}
          />
          
          <input 
            name="water_interval" 
            type="number" 
            placeholder="Water Interval (days)"
            onChange={e=>setWaterInterval(Number(e.target.value)*1000)}
          />

          <input 
            name="pokon_interval" 
            type="number" 
            placeholder="Pokon Interval (days)"
            onChange={e=>setPokonInterval(Number(e.target.value)*1000)}
          />

          &nbsp;
          <label>Sun Required</label>
          <select name="sun_required" onChange={e=>setSunRequired(e.target.value)}>
            <option value="Full Sun">Full Sun</option>
            <option value="Half Shade">Half Shade</option>
            <option value="Full Shade"> Full Shade</option>
          </select>  

          <button type="submit">Add Plant</button>
      </form>
      <div className={styles.bar} />
      {/* <button type="submit" onClick={handleAdd}>
        Add Plant
      </button> */}
    </div>
  );
};

export default NewPlantCard;