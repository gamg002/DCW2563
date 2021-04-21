import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const URL1 = 'http://localhost/api/produce'
const URL2 = 'http://localhost/api/admin'

export default function Home({ token }) {


  




  return (




    <div className={styles.container1} >
      <Navbar />
      <h1>Produce</h1>
      <br />

      <div >
        <iframe src="http://localhost:3000/framehome" height="670" width="1000"></iframe>
      </div>


    </div>


  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
