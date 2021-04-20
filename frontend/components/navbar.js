import Link from 'next/link'
import styles from '../styles/Home.module.css'
const Navbar = () => (
    <div>
        <button className={styles.button2}  ><a href="/"> <span>Home </span></a></button>
        <button className={styles.button2} ><a href="/profile"><span>Profile</span>  </a></button>
        <button className={styles.button2} ><a href="/Admin"> <span>Admin </span> </a></button>
        <button className={styles.button2} ><a href="/logout"> <span>Logout </span> </a></button>
    </div>
)

export default Navbar