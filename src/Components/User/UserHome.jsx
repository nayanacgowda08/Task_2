// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import Banner from '../Banner'
import Products_Display from '../Products_Display'
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/')
    }
  })

  return (
    <>
    <Banner/>
    <h1 style={{
        marginTop: '50px',
        textAlign: 'center'
      }}
    >Products List</h1>
    <Products_Display/>
    </>
  )
}

export default UserHome