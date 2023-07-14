import { useEffect, useState } from 'react'
import './App.css'
import AddCat from './components/AddCat'
import AddDog from './components/AddDog'
import axios from 'axios'

function App () {
  const [list, setList] = useState([])
  const getAnimals = () => {
    axios
      .get(`http://localhost:3900/getAnimals`, { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setList(res.data)
      })
      .catch(err => {
        console.log('error getAnimals', err)
      })
  }

  return (
    <div className="App">
      <AddDog getAnimals={getAnimals} />
      <AddCat getAnimals={getAnimals} />
      {list}
    </div>
  )
}

export default App

