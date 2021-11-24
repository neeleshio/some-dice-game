import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [grid, setGrid] = useState(0)
  const [players, setPlayers] = useState(0)
  const [totalGrid, setTotalGrid] = useState(0)
  const [roll, setRoll] = useState({})

  const handleStartGame = () => {
    setTotalGrid(Number(grid) * Number(grid))
  }

  useEffect(() => {
    let obj = {};
    let arr = []
    let steps = []
    let total = 0;

    [...Array(Number(players)).keys()].map(el => {
      while (total < totalGrid) {
        let diceRoll = Math.floor(Math.random() * (6 - 1) + 1)
        arr.push(diceRoll)
        steps.push(total + diceRoll)
        total = total + diceRoll
      }

      obj[el + 1] = { dice: arr, steps: steps, total: total }
      arr = []
      steps = []
      total = 0
    })

    setRoll(obj)
  }, [totalGrid])

  return (
    <div className="App">
      <header className="App-header">
        <h1><u>Dice Game</u></h1>
        <label>Grid size</label>
        <input type="number" onChange={e => setGrid(e.target.value)} />
        <label>Players</label>
        <input type="number" onChange={e => setPlayers(e.target.value)} />

        <button onClick={handleStartGame}>Start game</button>
        <table>
          <tr>
            <th>Player Number</th>
            <th>Dice Roll</th>
            <th>Dice Roll History</th>
            <th>Position History</th>
            <th>Winner</th>
          </tr>
          {Object.entries(roll).map(([key, value]) => (
            <tr>
              <td>{key}</td>
              <td>{value["dice"][value["dice"].length - 1]}</td>
              <td>{value["dice"].join()}</td>
              <td>{value["steps"].join()}</td>
              <td>{value["total"] === totalGrid ? "Winner" : "-"}</td>
            </tr>
          ))}
        </table>
      </header >
    </div >
  );
}

export default App;
