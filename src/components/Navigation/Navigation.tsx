import styles from './Navigation.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from '../../App';

export default function Navigation() {
    const isAdmin = useContext(AdminContext);
    return(
        <>
            <nav>
                <Link className={styles.link} to={'/'}>Home</Link>
                <br/>
                <Link className={styles.link} to={'/bird-list'}>All birds</Link>
                <br/>
                <Link className={styles.link} to={'/donations'}>Donations</Link>
                <br/>
                <Link className={styles.link} to={'/news'}>News</Link>
                <br/>
                <Link className={styles.link} to={'/information'}>Information</Link>
                <br/>
                {isAdmin[0] && <Link className={styles.link} to={'/new-bird'}>Add new bird</Link>}
            </nav>
        </>
    );
}