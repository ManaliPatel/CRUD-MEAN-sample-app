import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  const readData = async () => {
    await Axios.get("http://localhost:3001/read").then((response) =>{
      setFoodList(response.data);
     })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response)=>{
      setFoodList(response.data);
    })
  }, [])

   const updateFood = async (id) => {
     await Axios.put("http://localhost:3001/update", {id: id, newFoodName: newFoodName})
     readData()
  }

  const deleteFood = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`)
    readData()
  }

  const addToList = async () => {
    await Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
    readData()
  }
  return (
    <div className="App">
    <br/>
    <h1 className="textColor">CRUD Application with MERN</h1>
    <br/>
    <label className="textColor">Food Name : </label>
    <input 
      type="text" 
      placeholder="enter food name"
      value={foodName}
      onChange={(event) => {setFoodName(event.target.value)}}
    />
    <label className="textColor">Days Since You Ate It : </label>
    <input 
      type="number" 
      placeholder="enter number"
      value={days}
      onChange={(event) => {setDays(event.target.value)}}
    />
    <button className="addbutton" onClick={addToList}>Add To List</button>
    <br/>
    <h1 className="textColor">Food List</h1>
    {foodList.map((val, key) => {
      return <div key={key} className="food">
        <h1 className="textColor">{val.foodName}</h1>
        <h1 className="textColor">{val.daysSinceIAte}</h1>
        <input
          type="text" 
          placeholder="enter new food name..."
          onChange={(e) => {setNewFoodName(e.target.value)}}
          />
          &nbsp;
        <button onClick={() => updateFood(val._id)}>Update</button>
        &nbsp;
        <button onClick={() => deleteFood(val._id)}>Delete</button>
      </div>
    })}
  </div>
);
}

export default App;
