import Button from '../UI/Button/Button';
import styles from './NewsItem.module.css'
import { Card } from 'react-bootstrap';
import { useContext } from 'react';
import { AdminContext } from '../../App';
import axios from 'axios';

export default function NewsItem(props: any) {

    const important = props.important;
    const isAdmin = useContext(AdminContext);

    async function deleteNewsHandler() {
        await axios.delete("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/news/" + props.id + ".json/");
        await axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/news.json")
            .then((result: any) => props.onNewsDelete(result.data));
    }

    return(
        <>
            <Card id={styles.card}>
                <Card.Title id={important ? styles.important : styles.nonImportant}>
                    <div className={styles.grid}>
                        <div className={styles.item}>
                            <h3 id={styles.newsTitle}>{props.title}</h3>
                        </div>
                        <div className={styles.item}>
                            <h3 id={styles.date}>{props.dateOfCreation}</h3>
                        </div>
                    </div>
                </Card.Title>
                <Card.Body id={styles.body}>
                    <h5>{props.content}</h5>
                </Card.Body>
                <Card.Header id={important ? styles.importantHeader : styles.nonImportantHeader}>
                    <div className={styles.grid}>
                        <div className={styles.item}>
                            {important ? <h3>IMPORTANT</h3> : <h3>GENERAL</h3>}
                        </div>
                        <div className={styles.item}>
                            {isAdmin[0] && <Button style={styles.deleteButton} onClick={deleteNewsHandler}>Delete</Button>}
                        </div>
                    </div>
                </Card.Header>
            </Card>
        </>
    );
}