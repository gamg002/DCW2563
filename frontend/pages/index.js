import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const URL1 = 'http://localhost/api/produce'
const URL2 = 'http://localhost/api/admin'

export default function Home({ token }) {


  const [Produces, setProduces] = useState({
    list: [
      { id: 1, nameproduce: "Game", cost: 2500 }
    ]

  })

  const printProduces = () => {
    return (Produces.list.map((item, index) =>
    (<li key={index} className={styles.list} >
      <div>

        {item.nameproduce}<br></br>
        {item.cost} bath / day
      </div>
      <div>
        <button className={styles.button} onClick={() => addProduce(item.nameproduce, item.cost) && deleteProduce(item.id)}  > <span>Select</span> </button>
      </div>

    </li>)))
  }



  useEffect(() => {
    getProduces()
  }, [])

  const getProduces = async () => {
    let std = await axios.get(URL1)
    setProduces(std.data)
  }


  const [admin, setAdmin] = useState({})


  const addProduce = async (nameproduce, cost) => {
    let stu = await axios.post(URL2, { nameproduce, cost })
    setAdmin(stu.data)

  }

  const deleteProduce = async (id) => {
    let stu = await axios.delete(`${URL1}/${id}`)
    setProduces(stu.data)
  }





  return (




    <div className={styles.container1} >
      <Navbar />
      <h1>Produce</h1>
      <br />
      <div>
        <div className={styles.container2}>
          {printProduces()}
        </div>
      </div>

    </div>


  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
