import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response.substring(0, 80)) + "...")
        }
    }

    const loginForm = () => (
        <form >
            <div >

                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div >

                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </form>
    )


    return (
        <div className={styles.container1}>
            <Navbar />
            <div className={styles.container3}>
                <h1>Login</h1>
                <br />
                <div>
                    Status:  {status }
                </div>
                <br />
                {loginForm()}
                <div>
                    <br></br>
                    <button className={styles.buttonlogin} onClick={login}>Login</button>
                    <button className={styles.buttonlogin}><a href="/register"> Register </a></button><br></br><br></br>
                    <button className={styles.buttonre} ><a href="/Admin"> Go Admin page </a></button>
                </div>
            </div>

        </div>




        /****************************************************************************************************************** */


    )

}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}