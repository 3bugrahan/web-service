import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function List({baslik}) {

  const [list, setList] = useState([]);
  const [item, setItem] = useState([]);
  
  useEffect ( () => {
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    axios.post("http://38.242.218.44:3000/global", {"ms":"mvt","cmd":"il/findAll","payload":{}}, config)
    .then(response => {
      console.log('Data', response.data)
      setList(response.data);
    })
    .catch(e => {
      console.log('Hata', e);
    });
  }, []);

  console.log({list});

  const webService = () => {
      setItem(list.map(city => {
      return (
          <div>
              <li>
                  Bölge Id = {city.bolgeId} &emsp; 
                  Plaka Kodu = {city.kodu} &emsp; 
                  Şehir İsmi = {city.adi}
              </li>
          </div>
      )
      }))
  }

  return (
    <>
    <h3>{baslik}</h3>
    {item}
    <button onClick={webService}>Getir</button>

    </>
  )
}