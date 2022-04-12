import React, { useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export default function List({ baslik}) {

  const [list, setList] = useState([]);
  const [item, setItem] = useState([]);

  const webService = async () =>  {
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    const response = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "il/findAll", "payload": {} }, config);
    setList(response.data)
    setItem(list)
    
    console.log(list);
  }
    

  return (
    <>
      <h3>{baslik}</h3>
      
      <div>
            <DataTable value={item} responsiveLayout="scroll">
              <Column field="bolgeId" header="Bölge Id"></Column>
              <Column field="kodu" header="Kodu"></Column>
              <Column field="adi" header="Şehir Adı"></Column>
            </DataTable>
      </div>
      <button onClick={webService}>Getir</button>
    </>
  )
}