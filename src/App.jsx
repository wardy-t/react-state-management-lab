// src/App.jsx
import zombieFightersData from './zombieFighters';
import { useState, useEffect } from 'react';
import './App.css'


const App = () => {

  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters] = useState(zombieFightersData);


  const calculateTotalStrength = () => {
    return team.reduce((total, fighter) => total + fighter.strength, 0);
  };

  const calculateTotalAgility = () => {
    return team.reduce((total, fighter) => total + fighter.agility, 0);
  };

  const [totalStrength, setTotalStrength] = useState(0);
  const [totalAgility, setTotalAgility] = useState(0);

  useEffect(() => {
    setTotalStrength(calculateTotalStrength());
    setTotalAgility(calculateTotalAgility());
  }, [team]);



  const handleAddFighter = (newFighter) => {
    if (money >= newFighter.price) {

      const newTeamArray = [...team, newFighter];
      setTeam(newTeamArray);

      const updateMoney = (money - newFighter.price);
      setMoney(updateMoney);

      console.log('Your Team:', newTeamArray);
    
    } else {
      console.log('Out of Cash!!!')
    };
  };

  const handleRemoveFighter = (removeFighter) => {
    const newTeamArray = team.filter((fighter) => fighter !== removeFighter);
    setTeam(newTeamArray);

    const updatedMoney = money + removeFighter.price;
    setMoney(updatedMoney);
  };

  return (
    <div>
      <h1>Zombie Fighters! 🎸 GUITAR SOLO 🎸 </h1>
      <p>Money: ${money}</p>

      <p>Total Team Strength: {totalStrength}</p>
      <p>Total Team Agility: {totalAgility}</p>

      {team.length === 0 ? (
      <p>Pick some team members!</p>
      ) : (
      <div>
    <h2>Your Team:</h2>
    <ul>
      {team.map((fighter, index) => (
        <li key={index}>
          <h3>{fighter.name}</h3>
          <img src={fighter.img} alt={fighter.name} />
          <p>Price: ${fighter.price}</p>
          <p>Strength: {fighter.strength}</p>
          <p>Agility: {fighter.agility}</p>
          <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
)}
      <div>
        {zombieFighters.map((fighter, index) => (
          <div key={index}>
            <h2>{fighter.name}</h2>
            <img src={fighter.img} alt={fighter.name} />
            <p>Price: ${fighter.price}</p>
            <p>Strength: {fighter.strength}</p>
            <p>Agility: {fighter.agility}</p>

            <button onClick={() => handleAddFighter(fighter)}> Add </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App