import React, { useEffect } from 'react';
import axios from 'axios';

export default function List({baslik}) {

  //const [list, setList] = useState([]);

  useEffect ( () => {
    axios.post("http://38.242.218.44:3000/global")
    .then(response => {
      console.log(response.data);
    });
  }, [])
    
 


  return (
    <>
    <h3>{baslik}</h3>
    
    <button >Getir</button>
    </>
  )
}