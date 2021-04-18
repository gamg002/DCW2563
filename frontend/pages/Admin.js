import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'

const Profile1 = ({ token }) => {

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
            <div className={styles.container}>
                <Navbar />
                <div>
                    <h2>
                        Add Stu
                    </h2>
                      name: <input type="text" onChange={(e) => setFname(e.target.value)}></input>
                      cost: <input type="text" onChange={(e) => setSurname(e.target.value)}></input>
                    <button onClick={() => addStu(fname, surname, major, gpa)}>Add</button>

                    <div><h2>Produce</h2>
                        <ul className={styles.list} >
                            { }
                        </ul>
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
