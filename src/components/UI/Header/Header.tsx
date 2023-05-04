import styles from './Header.module.css'

export default function Header() {
    return(
        <>
            <header id={styles.header}>
                <h3 id={styles.name}>Feathered Friends Sanctuary</h3>
            </header>
        </>
    );
}