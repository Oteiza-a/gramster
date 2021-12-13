import React from 'react';
import { Button, Grid } from '@mui/material';
import './Home.css'

export function Home() {

  return (
   <div className='home-page-container'>
     <div className='basic-page-template'>
      <Grid container>
        <Grid item xs={12}>
          <div className='home-page-header'>
            <div className='title'>Registered Sheets</div>
            <Button variant="contained">Add Sheet</Button>
          </div>
        </Grid>
      </Grid>
     </div>
   </div>
  )
}