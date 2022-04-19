import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export default function List({ baslik, dialogVisible }) {

  const [citys, setCitys] = useState([]);
  const [zones, setZones] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedZone, setSelectedZone] = useState([]);
  const [open, setOpen] = useState(false);
  const [addCity, setAddCity] = useState({ id: "", bolgeId: "", kodu: "", adi: "" });
  const [addZone, setAddZone] = useState("");
  const [city, setCity] = useState([]);
  /*const [code, setCode] = useState("");*/

  async function webService() {
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    const response1 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "il/findAll", "payload": {} }, config);
    setCitys(response1.data);
    setItems(response1.data);
    console.log(response1.data);
    const response2 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "bolge/findAll", "payload": {} }, config);
    setZones(response2.data);
    setAddZone(response2.data);
    console.log(response2.data);
  }

  useEffect(() => {
    setItems(citys.filter(citys => citys.bolgeId === selectedZone.id));
  }, [selectedZone])

  console.log(selectedZone);

  function addObj() {
    setAddCity({...addCity, id: (citys.length + 1), bolgeId: city.id})
    JSON.stringify(addCity)
  }

  console.log(addCity);

  function editCity() {
  }

  function deleteCity() {
  }

  function operationButtons() {
    return (
      <>
        <button onClick={editCity}> Düzenle </button>
        <button onClick={deleteCity}> Sil </button>
      </>
    );
  }

  function bolgeTemplate(row) {
    return zones.find(val => val.id === row.bolgeId)?.adi;
  }

  return (
    <>
      <h3>{baslik}</h3>
      <button onClick={(e) => setOpen(true)}>Ekle</button>
      <Dropdown value={selectedZone} options={zones} onChange={(e) => setSelectedZone(e.target.value)} optionLabel="adi" placeholder="Select a Zone" />
      <DataTable value={items} responsiveLayout="scroll">
        <Column field="id" header="id"></Column>
        <Column field="bolgeId" header="Bölge" body={bolgeTemplate}></Column>
        <Column field="kodu" header="Kodu"></Column>
        <Column field="adi" header="Şehir Adı"></Column>
        <Column body={operationButtons} header="İşlemler"></Column>
      </DataTable>
      <button onClick={webService}>Getir</button>
      <Dialog visible={open} header="İl Ekleme" onHide={() => setOpen(false)}  /*footer={}*/>
        <Dropdown value={city} options={addZone} onChange={(e) => setCity(e.target.value)} optionLabel="adi" placeholder="Select a Zone" /><br></br>
        <input type="text" value={addCity.adi} onChange={(e) => setAddCity({ ...addCity, adi: e.target.value })} placeholder="Adı" /><br></br>
        <input type="text" value={addCity.kodu} onChange={(e) => setAddCity({ ...addCity, kodu: e.target.value })} placeholder="Kodu" /><br></br>
        <button onClick={addObj}> Ekle </button>
        <button onClick={(e) => setOpen(false)}> Kapat </button>
      </Dialog>
    </>
  )
}