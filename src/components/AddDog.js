import React, { useState } from 'react'
import axios from 'axios'

const AddDog = ({ getAnimals }) => {
  const [addDog, setAddDog] = useState('')

  const sendDog = () => {
    axios
      .post(
        `http://localhost:3900/sendDog`,
        {
          data: addDog
        },
        {
          withCredentials: true
          // headers: {
          //     Cookie: "cookie1=value; cookie2=value; cookie3=value;"
          // }
        }
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
      <input value={addDog} onChange={e => setAddDog(e.target.value)} />
      <button onClick={sendDog} type="submit">
        Submit
      </button>
    </div>
  )
}

export default AddDog
