import React from 'react';
import { useNavigate } from 'react-router-dom'

import { Button, Grid } from '@mui/material';
import './Home.css'

export function Home() {
  let navigate = useNavigate();

  const goAddSheet = () => navigate('/sheet')

  return (
   <div className='home-page-container'>
     <div className='basic-page-template'>

      <Grid container>
        <Grid item xs={12}>
          <div className='home-page-header'>
            <div className='title'>Registered Sheets</div>
            <Button onClick={goAddSheet} variant="contained">Add Sheet</Button>
          </div>
        </Grid>
      </Grid>

      <div className='sheets-section'>

      </div>

     </div>
   </div>
  )
}