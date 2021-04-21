import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const URL2 = 'http://localhost/api/admin'
const URL1 = 'http://localhost/api/produce'


const Profile1 = ({ token }) => {


    const [Produces, setProduces] = useState({
        list: [
            { id: 1, nameproduce: "Game", cost: 2500, image: "" }
        ]

    })

    const printProduces = () => {
        return (Produces.list.map((item, index) =>
        (<li key={index} className={styles.listItem} >
            <div>

                {item.nameproduce}<br></br>
                {item.cost} bath / day
          </div>
            <div>
                <button className={styles.button} onClick={() => deleteProduce(item.id)}  > <span>Delete</span> </button>
            </div>
            <div>
                <img src={item.image} alt="" width="250" height="200" />
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


    const [admins, setAdmins] = useState({})
    const [nameproduce, setNameproduce] = useState("")
    const [cost, setCost] = useState("")
    const [image, setImage] = useState("")

    const addSetProduce = async (nameproduce, cost, image) => {
        let stu = await axios.post(URL1, { nameproduce, cost, image })
        setProduces(stu.data)

    }


    /*const addProduce = async (nameproduce, cost) => {
        let stu = await axios.post(URL2, { nameproduce, cost })
        setAdmins(stu.data)

    }*/

    const deleteProduce = async (id) => {
        let stu = await axios.delete(`${URL1}/${id}`)
        setProduces(stu.data)
    }




    /****************************************************************************************************************************************************** */
    /************************************************************************************************************************************************** */
    const [admin, setAdmin] = useState({
        list: [
            { id: 1, nameproduce: "Game", cost: 2500, image: "" }
        ]

    })

    const printAdmin = () => {
        return (admin.list.map((item, index) =>
        (<li key={index} className={styles.listItem} >
            <div>

                {item.nameproduce}<br></br>
                {item.cost} bath / day
          </div>
            <div>
                <button className={styles.button} onClick={() => addAdmin(item.nameproduce, item.cost, item.image) && deleteAdmin(item.id)}  > <span>Update</span> </button>
            </div>
            <div>
                <img src={item.image} alt="" width="250" height="200" />
            </div>

        </li>)))
    }



    useEffect(() => {
        getAdmin()
    }, [])

    const getAdmin = async () => {
        let std = await axios.get(URL2)
        setAdmin(std.data)
    }
    const [produce, setProducecar] = useState({})


    const addAdmin = async (nameproduce, cost, image) => {
        let stu = await axios.post(URL1, { nameproduce, cost, image })
        setProducecar(stu.data)

    }

    const deleteAdmin = async (id) => {
        let stu = await axios.delete(`${URL2}/${id}`)
        setAdmin(stu.data)
    }

    /****************************************************************************************************************************************************** */
    /****************************************************************************************************************************************************** */
    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <Layout>
            <Head>
                <title>Token Check</title>
            </Head>
            <div className={styles.container1}>
                <Navbar />
                <div>
                    <h2>
                        Add Car
                    </h2>
                      name: <input type="text" onChange={(e) => setNameproduce(e.target.value)}></input>
                      cost: <input type="text" onChange={(e) => setCost(e.target.value)}></input>
                      Picture:<select name="image" onChange={(e) => setImage(e.target.value)}>
                        <option value="/honda.PNG" selected>--Select--</option>
                        <option value="/toyota.PNG">Toyota</option>
                        <option value="/honda.PNG" >Honda</option>
                        <option value="/isuzu.PNG">ISUZU</option>
                        <option value="/ford.PNG">Ford</option>
                    </select>

                    <button className={styles.button} onClick={() => addSetProduce(nameproduce, cost, image)}><span>Add</span></button>
                    <div className={styles.adminrow}>
                        <div>
                            <h2>Car List</h2>
                            <div className={styles.listadmin}>
                                {printProduces()}
                            </div>
                        </div>



                        <div>
                            <h2>Car for rents</h2>
                            <div className={styles.listadmin}>
                                {printAdmin()}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
