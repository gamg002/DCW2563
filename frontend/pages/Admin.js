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
const URL3 = 'http://localhost/api/profileuser'



const Profile1 = ({ token }) => {


    const [Produces, setProduces] = useState({
        list: [
            { id: 1, cost: "2500", image: "" }
        ]

    })

    const printProduces = () => {
        return (Produces.list.map((item, index) =>
        (<li key={index} className={styles.listItem1} >

            <div>
                <div>
                    <img src={item.image} alt="" width="250" height="200" />
                </div>
                <div className={styles.wak} >

                    {item.cost} bath / day

                   </div>



            </div>

            <div className={styles.wak}>
                <button className={styles.button} onClick={() => deleteProduce(item.id)}  > <span>Delete</span> </button>
                <button className={styles.button} onClick={() => updateproduce(item.id, item.image)}  > <span>Update cost</span> </button>
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

    const [cost, setCost] = useState("")
    const [image, setImage] = useState("")

    const addSetProduce = async (cost, image) => {
        let stu = await axios.post(URL1, { cost, image })
        setProduces(stu.data)

    }

    const updateproduce = async (id) => {
        let stu = await axios.put(`${URL1}/${id}`, { cost, image })
        setProduces(stu.data)
    }


    const deleteProduce = async (id) => {
        let stu = await axios.delete(`${URL1}/${id}`)
        setProduces(stu.data)
    }




    /****************************************************************************************************************************************************** */
    /************************************************************************************************************************************************** */
    const [admin, setAdmin] = useState({
        list: [
            { id: 1, cost: "2500", image: "" }
        ]

    })



    const printAdmin = () => {
        return (admin.list.map((item, index) =>
        (<li key={index} className={styles.listItem1} >

            <div className={styles.wak}>{index + 1}</div>
            <div>
                <div>
                    <img src={item.image} alt="" width="250" height="200" />
                </div>
                <div className={styles.wak} >

                    {item.cost} bath / day

                   </div>



            </div>
            <div>
                <button className={styles.button} onClick={() => addAdmin(item.nameproduce, item.cost, item.image) && deleteAdmin(item.id) && deleteprofileuser(item.id)}  > <span>Add List</span> </button>
                <button className={styles.button} onClick={() => getprofile(item.id)}><span>Get Profile</span></button>
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
        let stu = await axios.post(URL1, { cost, image })
        setProducecar(stu.data)

    }

    const deleteAdmin = async (id) => {
        let stu = await axios.delete(`${URL2}/${id}`)
        setAdmin(stu.data)
    }
    const deleteprofileuser = async (id) => {
        let stu = await axios.delete(`${URL3}/${id}`)
        setprofileuser(stu.data)
    }
    const [profileuser, setprofileuser] = useState({})
    /****************************************************************************************************************************************************** */
    /****************************************************************************************************************************************************** */


    const [profiles, setProfiles] = useState({
        list: [
            { id: 1, nameprofile: "game", call: "0908901837", day: "7", location: "PSU" }
        ]

    })

    const [profile, setProfile] = useState({})
    const getprofile = async (id) => {
        let profile = await axios.get(`${URL3}/${id}`)

        setProfile({
            nameprofile: profile.data.nameprofile,
            call: profile.data.call,
            day: profile.data.day,
            location: profile.data.location
        })
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

        <div className={styles.container1}>
            <Navbar />
            <div>
                <h2>
                    Add Car
                    </h2>
                   <div>
                       Car:<select name="image" onChange={(e) => setImage(e.target.value)}>
                    <option value="/honda.PNG" selected>--Select--</option>
                    <option value="/toyota.PNG">Toyota</option>
                    <option value="/honda.PNG" >Honda</option>
                    <option value="/isuzu.PNG">ISUZU</option>
                    <option value="/ford.PNG">Ford</option>
                </select>
                </div>
                <div>cost: <input type="text" onChange={(e) => setCost(e.target.value)}></input></div>
                <div> <button className={styles.buttonre} onClick={() => addSetProduce( cost, image)}><span>Add</span></button></div>

               
                <div className={styles.adminrow}>
                    <div>
                        <h2>Car List</h2>
                        <div className={styles.listadmin}>
                            {printProduces()}
                        </div>
                    </div>



                    <div>
                        <h2>Rented Car</h2>
                        <div className={styles.listadmin}>

                            <div >
                                <div className={styles.selectitem}>&#128130;: {profile.nameprofile}<br></br></div>
                                <div className={styles.selectitem}>&#128383;: {profile.call}<br></br></div>
                                <div className={styles.selectitem}>&#128336;: {profile.day + " - " + "day"}<br></br></div>
                                <div className={styles.selectitem}>&#128204;: {profile.location}<br></br></div>

                                {printAdmin()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
