import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const URL1 = 'http://localhost/api/produce'

export default function Home({ token }) {


  const [Produces, setProduces] = useState({
    list: [
      { id: 1, nameproduce: "Game", cost: "2500" }
    ]

  })

  const printProduces = () => {
    return (Produces.list.map((item, index) =>
    (<li key={index} className={styles.listItem} >
       {index + 1}<br></br>
       { item.nameproduce}<br></br>
       { item.cost} bath<br></br>

      <button className={`${styles.button} ${styles.btnEdit}`} onClick={() => getProduce(item.id)}>Buy</button>

    </li>)))
  }


  useEffect(() => {
    getProduces()
  }, [])

  const getProduces = async () => {
    let std = await axios.get(URL1)
    setProduces(std.data)
  }


  return (

    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <div>

          <h2>Produce</h2>
          <ul className={styles.list} >
            {printProduces()}
          </ul>


        </div>
      </div>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
