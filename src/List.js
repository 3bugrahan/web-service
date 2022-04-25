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
  const [city, setCity] = useState();
  const [cityDel, setCityDel] = useState(null);
  const [cityUpd, setCityUpd] = useState(null);
  /*const [item, setItem] = useState([]);*/

  async function webService() {
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    const response1 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "il/findAll", "payload": {} }, config);
    setCitys(response1.data);
    setItems(response1.data);
    console.log(response1);
    const response2 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "bolge/findAll", "payload": {} }, config);
    setZones(response2.data);
    setAddZone(response2.data);
    console.log(response2.data);
  }

  console.log(selectedZone);

  async function addObj() {
    /*setAddCity({...addCity, id: null, bolgeId: city.id});*/
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    const response3 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "il/create", "payload": addCity }, config);
    console.log(response3);
    setOpen(false);
  }

  console.log(addCity);

  useEffect(() => {
    setItems(citys.filter(citys => citys.bolgeId === selectedZone.id));
  }, [selectedZone]);

  async function deleteCity() {
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    const response4 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "il/remove", "payload": cityDel }, config);
    console.log(response4);
    setCityDel(null);
  }

  async function editCity() {
    /*setCityUpd({ ...cityUpd, bolgeId: city.id })*/
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGRpaml0ZWsuY29tLnRyIiwic3ViIjoxLCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNjQ5MjQ1NTcyLCJleHAiOjE2NTE4Mzc1NzJ9.Hx-KCOZQ5F9HxE2NxPmqXJa-7W2AbcLKFYoc-Kfw-us' }
    };
    const response5 = await axios.post("http://38.242.218.44:3000/global", { "ms": "mvt", "cmd": "il/update", "payload": {...cityUpd, bolgeId: city.id} }, config);
    console.log(response5);
    setCityUpd(null);
  }

  function operationButtons(row) {
    return (
      <>
        <button onClick={(e) => setCityUpd(row)}> Düzenle </button>
        <button onClick={(e) => setCityDel(row)}> Sil </button>
      </>
    );
  }

  function bolgeTemplate(row) {
    return zones.find(val => val.id === row.bolgeId)?.adi;
  }

  console.log(cityUpd?.bolgeId);

  return (
    <>
      <h3>{baslik}</h3>
      <Dialog visible={open} header="İl Ekleme" onHide={() => setOpen(false)}  /*footer={}*/>
        <Dropdown value={city} options={addZone} onChange={(e) => setCity(e.target.value)} optionLabel="adi" placeholder="Select a Zone" /><br></br>
        <input type="text" value={addCity.adi} onChange={(e) => setAddCity({ ...addCity, adi: e.target.value, bolgeId: city.id })} placeholder="Adı" /><br></br>
        <input type="text" value={addCity.kodu} onChange={(e) => setAddCity({ ...addCity, kodu: e.target.value, id: null })} placeholder="Kodu" /><br></br>
        <button onClick={addObj}> Ekle </button>
        <button onClick={(e) => setOpen(false)}> Kapat </button>
      </Dialog>
      <Dropdown value={selectedZone} options={zones} onChange={(e) => setSelectedZone(e.target.value)} optionLabel="adi" placeholder="Select a Zone" />
      <button onClick={(e) => setOpen(true)}>Ekle</button>
      <DataTable value={items} responsiveLayout="scroll">
        <Column field="id" header="id"></Column>
        <Column field="bolgeId" header="Bölge" body={bolgeTemplate}></Column>
        <Column field="kodu" header="Kodu"></Column>
        <Column field="adi" header="Şehir Adı"></Column>
        <Column body={operationButtons} header="İşlemler"></Column>
      </DataTable>
      <button onClick={webService}>Getir</button>
      <Dialog visible={!!cityDel} header="İl Silme" onHide={(e) => setCityDel(null)} >
        <p>Kaydı silmek istediğinize emin misizniz?</p><br></br>
        <button onClick={deleteCity}> Evet </button>
        <button onClick={(e) => setCityDel(null)}> Hayır </button>
      </Dialog>
      <Dialog visible={!!cityUpd} header="İl Düzenleme" onHide={(e) => setCityUpd(null)}  /*footer={}*/>
        <Dropdown value={city} options={addZone} onChange={(e) => setCity(e.target.value)} optionLabel="adi" placeholder="Select a Zone" /><br></br>
        <input type="text" value={cityUpd?.adi} onChange={(e) => setCityUpd({ ...cityUpd, adi: e.target.value })} placeholder="Adı" /><br></br>
        <input type="text" value={cityUpd?.kodu} onChange={(e) => setCityUpd({ ...cityUpd, kodu: e.target.value })} placeholder="Kodu" /><br></br>
        <button onClick={editCity}> Kaydet </button>
        <button onClick={(e) => setCityUpd(null)}> Kapat </button>
      </Dialog>
    </>
  )
}