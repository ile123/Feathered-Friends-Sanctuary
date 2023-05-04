import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'
import Navigation from '../../Navigation/Navigation';

export default function Layout(props: any) {
    return(
        <>
            <Header/>
                <main>
                    <div id={styles.sidebar}>
                        <Navigation />
                    </div>
                    <div id={styles.mainContent}>
                        {props.children}
                    </div>
                </main>
            <Footer/>
        </>
    );
}