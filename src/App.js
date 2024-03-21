import './App.css';
import { loeAndmed } from './utils'
import Asukohad from './Asukohad'
import { useState } from 'react'
import Detailid from './Detailid'

function App() {

  const asukohad = [
    {
      nimetus: 'Pärnu',
      lat: 58.3917,
      long: 24.4953,
      andmed: null
    },
    {
      nimetus: 'Tallinn',
      lat: 59.4370,
      long: 24.7536,
      andmed: null
    },
    {
      nimetus: 'Tartu',
      lat: 58.378,
      long: 26.729,
      andmed: null
    }
  ]

  const [aktiivne, setAktiivne] = useState(0) 

  const [ilmPraegu, setIlmPraegu] = useState(undefined)

  const muudaAktiivset =  async (index) => {
    const koht = asukohad[index];
    setAktiivne(index)
    const andmed = await loeAndmed({lat: koht.lat, long: koht.long})
    setIlmPraegu(andmed)
    console.log(andmed)
  }

  return (
    <div className="container">
      <h1>Ilm</h1>
      <div className="row">
        <div className="col-4">
        <Asukohad asukohad={asukohad} muudaAktiivset={muudaAktiivset}/>
        </div>
        <div className="col-8">
          <Detailid koht={asukohad[aktiivne]} ilmPraegu={ilmPraegu}/>
        </div>
        
      </div>

    </div>
  );
}

export default App;
