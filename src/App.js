import './App.css';
import { loeAndmed } from './utils'
import Asukohad from './Asukohad'
import { useState, useEffect } from 'react'
import Detailid from './Detailid'
import Lisa from './Lisa'

function App() {

  const [asukohad, setAsukohad] = useState( [
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
    },
  ])

  const [aktiivne, setAktiivne] = useState(0) 

  const [ilmPraegu, setIlmPraegu] = useState(undefined)

  const [lisamineAvatud, setLisamineAvatud] = useState(false)

  const muudaAktiivset =  async (index) => {
    const koht = asukohad[index];
    setAktiivne(index)
    const andmed = await loeAndmed({lat: koht.lat, long: koht.long})
    setIlmPraegu(andmed)
    console.log(andmed)
    setLisamineAvatud(false)
  }

  useEffect (() => {
      muudaAktiivset(0)
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const lisaAsukoht = ({nimetus, lat, long}) => {
    const uusAsukoht = {
      nimetus,
      lat,
      long,
      andmed: null
    }

    setAsukohad([...asukohad, uusAsukoht])

  }
  let paremPaan = (<Detailid koht={asukohad[aktiivne]} ilmPraegu={ilmPraegu}/>)
  if (lisamineAvatud) {
    paremPaan = <Lisa lisaAsukoht={lisaAsukoht}/>
  }

  return (
    <div className="container">
      <h1>Ilm</h1>
      <div className="row">
        <div className="col-4">
        <Asukohad asukohad={asukohad} muudaAktiivset={muudaAktiivset}/>
        <button className='btn btn-primary' onClick={() =>setLisamineAvatud(true)}>Lisa</button>
        </div>
        <div className="col-8">
          {paremPaan}
        </div>
        
      </div>

    </div>
  );
}

export default App;
