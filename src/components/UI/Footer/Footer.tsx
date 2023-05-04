import { useContext } from 'react';
import styles from './Footer.module.css'
import { AdminContext } from '../../../App';

export default function Footer() {
    const [isAdmin, setIsAdmin] = useContext(AdminContext);

    const onCheckboxChangeHandler = () => {
        setIsAdmin(!isAdmin);
    }

    return(
        <>
            <footer id={styles.footer}>
            <div className="container">
                <div className="row">
                    <div className='col-md-6 mt-4'>
                        <h4 id={styles.madeBy}>Made By: Ilario Batistić</h4>
                    </div>
                    <div className='col mt-2 justify-content-center'>
                        <div className={styles.checkbox_wrapper_44}>
                            <h3 id={styles.admin}>Admin</h3>
                            <label className={styles.toggleButton}>
                                <input type="checkbox" onChange={onCheckboxChangeHandler} defaultChecked={isAdmin}
                                />
                                <div>
                                <svg viewBox="0 0 44 44">
                                    <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                                </svg>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='col mt-4'>
                            <h6 id={styles.copyright}>&copy; Copyright {new Date().getFullYear()}, Feathered Friends Sanctuary. <p>All rights reserved.</p></h6>
                    </div>  
                </div>
            </div>
            </footer>
        </>
    );
}