import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export function RedirectPage() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/')
  })

  return <></>
}