import styles from './BirdListItem.module.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function BirdListItem(props: any) {
    return(
        <>
        <div id={styles.item}>
            <Card id={styles.card}>
                <Card.Header><h3 className={styles.name}>{props.adopted ? "ADOPTED" : "NOT ADOPTED"}</h3></Card.Header>
                <Card.Body id={styles.body}>
                    <Card.Img src={props.url} id={styles.image}></Card.Img>
                </Card.Body>
                <Card.Footer id={styles.footer}>
                    <Link to={"/bird-list/" + props.id} id={styles.link}><h3 className={styles.name}>{props.name}</h3></Link>
                </Card.Footer>
            </Card>
        </div>
        </>
    );
}