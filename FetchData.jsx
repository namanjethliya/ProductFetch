import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function FetchData() {
  const [randomData, setRandomData] = useState([])


  useEffect(() => {

  }, [])


  function showData(data) {
    async function getData() {
      const result = await axios.get('https://randomuser.me/api/')
      // console.log(result.data.results[0])}
      setRandomData(result.data.results)
    }
    getData();

  }



  return (
    <div id='wrapper'>
      <button onClick={showData}>Fetch Data</button>
      <div id="random">{
        randomData.map((data,index) => {
          return (
            <div key={index}>
              <img className="photo" src={data.picture.large} alt="" />
              <h3 className="name">{data.name.first + " " + data.name.last}</h3>
              <p className="dob">{data.dob.date.slice(0, 10)}</p>
              <p className="email">{data.email}</p>
            </div>
          )
        })
        // console.log(data)
      }

      </div>
    </div>

  )
}

export default FetchData