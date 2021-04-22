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
      { id: 1, nameproduce: "Game", cost: "2500", image: "" }
    ]

  })

  const printProduces = () => {
    return (Produces.list.map((item, index) =>
    (<li key={index} className={styles.listItem} >

      <div>
        <img src={item.image} alt="" width="250" height="200" />
      </div>
      <div>
        <br /><br />
        {item.nameproduce}<br></br>
        {item.cost} bath / day
      </div>
      <div>
        <br /><br />
        <a href="/profile" target="iframe_a"><button className={styles.button} onClick={() => addProduce(item.nameproduce, item.cost, item.image) && deleteProduce(item.id)}  > <span>Select</span> </button></a>
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


  const addProduce = async (nameproduce, cost, image) => {
    let stu = await axios.post(URL2, { nameproduce, cost, image })
    setAdmin(stu.data)

  }

  const deleteProduce = async (id) => {
    let stu = await axios.delete(`${URL1}/${id}`)
    setProduces(stu.data)
  }





  return (




    <div >
      <br />
      <div>
        <div>
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
