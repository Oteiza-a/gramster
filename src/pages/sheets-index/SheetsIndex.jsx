import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Components
import { Button, Grid } from '@mui/material';
import { LoadingSpinner } from '../../components/loading-spinner/LoadingSpinner';
import { SheetItem } from '../../components/sheet-item/SheetItem';
import { Empty } from '../../components/empty/Empty';
import { GramsterLogoText } from '../../components/gramster-logo-text/GramsterLogoText';

// Clients
import { getSheets } from '../../clients/sheets';

// CSS
import './SheetsIndex.css'

export function SheetsIndex() {
  const [sheets, setSheets] = useState([])
  const [loading, setLoading] = useState(true) 
  let navigate = useNavigate();

  const goAddSheet = () => navigate('/sheets/form')

  useEffect(() => {
    fetchSheets()
  }, [])

  const fetchSheets = async () => {
    const sheetsRes = await getSheets()
    if (sheetsRes) setSheets(sheetsRes)
    setLoading(false)
  }

  const goShowSheet = (id) => {
  }

  const renderSheets = () => {

    if (loading) return <LoadingSpinner loading={loading} size={50} containerHeight={120}/>

    if (sheets.length === 0) {
      return (
        <Empty 
          primaryText='There are no sheets registered!'
          secondaryText='Add a new sheet to start making daily logs.' 
          containerHeight='180px' 
        />
      )
    }
    return sheets.map((sheet, i) => <SheetItem sheet={sheet} onShow={goShowSheet} key={i}/>)
  }

  return (
   <div className='home-page-container'>
      <div className='medium-page-template'>

        <div className='logo-container'>
          <GramsterLogoText fontSize='30px' />
        </div>

        <Grid container>
          <Grid item xs={12}>
            <div className='home-page-header'>
              <div className='title'>Registered Sheets</div>
              <Button onClick={goAddSheet} variant="contained">New Sheet</Button>
            </div>
          </Grid>
        </Grid>

        <div className='sheets-section'>
          {renderSheets()}
        </div>

      </div>
   </div>
  )
}