import React, { useState } from 'react'
import axios from 'axios'

const AddCat = ({ getAnimals }) => {
  const [addCat, setAddCat] = useState('')

  const sendCat = () => {
    axios
      .post(
        `http://localhost:3900/sendCat`,
        {
          data: addCat
        },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res.data)
        getAnimals(res.data)
      })
      .catch(err => {
        console.log('sendCat Error:', err)
      })
  }

  return (
    <div>
      <input
        type="text"
        value={addCat}
        onChange={e => setAddCat(e.target.value)}
      />
      <button onClick={sendCat} type="submit">
        Submit
      </button>
    </div>
  )
}

export default AddCat
