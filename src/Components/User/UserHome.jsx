// eslint-disable-next-line no-unused-vars
import React from 'react'
import Banner from '../Banner'
import Products_Display from '../Products_Display'

const UserHome = () => {
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