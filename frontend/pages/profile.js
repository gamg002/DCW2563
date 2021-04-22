import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const URL3 = 'http://localhost/api/profileuser'
const URL2 = 'http://localhost/api/admin'

export default function Home({ token }) {


    const [profiles, setProfiles] = useState({
        list: [
            { id: 1, nameprofile: "game", call: "0908901837", day: "7", location: "PSU" },

        ]
    })

    useEffect(() => {
        getprofiles()
    }, [])

    const getprofiles = async () => {
        let std = await axios.get(URL3)
        setProfiles(std.data)
    }
    const [nameprofile, setNameprofile] = useState("")
    const [call, setCall] = useState("")
    const [day, setDay] = useState("")
    const [location, setLocation] = useState("")

    const addProfile = async (nameprofile, call, day, location) => {
        let stu = await axios.post(URL3, { nameprofile, call, day, location })
        setProfiles(stu.data)

    }








    return (

        <div className={styles.container1}>
            <div>
                Name - Surname: <br></br><input type="text" onChange={(e) => setNameprofile(e.target.value)}></input><br></br>
            Call:<br></br> <input type="text" onChange={(e) => setCall(e.target.value)}></input><br></br>
            Day for rent:<br></br> <input type="text" onChange={(e) => setDay(e.target.value)}></input><br></br>
            Location:<br></br> <input type="text" onChange={(e) => setLocation(e.target.value)}></input><br></br>
                <br></br><a href="/framehome" target="iframe_a"><button className={styles.button} onClick={() => addProfile(nameprofile, call, day, location)}><span>Submit</span></button></a>

            </div>
        </div>

    )
}

export function getServerSideProps({ req, res }) {
    // console.log("token from cookie: ",cookie.get("token")) 
    // console.log('req: ', req.headers)
    return { props: { token: req.cookies.token || "" } };
}