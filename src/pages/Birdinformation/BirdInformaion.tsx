import Layout from '../../components/UI/Layout/Layout';
import styles from './BirdInformation.module.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/UI/Button/Button';
import { AdminContext } from '../../App';
import { useNavigate } from "react-router-dom";

export default function BirdInformation(props: any) {

    const { id } = useParams();
    const [bird, setBird] = useState(null);
    const isAdmin = useContext(AdminContext);
    const navigate = useNavigate();

    async function adoptionHandler() {
        console.log("It works");
        const updatedData = { adopted: true };
        await axios.patch(`https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/birds/${id}.json`, updatedData);
        navigate("/bird-list");
    }

    useEffect(() => {
        axios.get(`https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/birds/${id}.json`)
          .then(response => {
            setBird(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, [id]);

    if(!bird) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <Layout>
                <Card id={styles.card}>
                    <Card.Header><h3 id={styles.name}>{bird.name}</h3></Card.Header>
                    <div className={styles.grid}>
                        <div className={styles.item}>
                            <Card.Img src={bird.url} id={styles.image} />
                        </div>
                        <div className={styles.item}>
                            <div id={styles.birdInformation}>
                                <div className={styles.grid}>
                                    <div className={styles.informationItem}>
                                        <label htmlFor="age" className={styles.label}>Age: </label>
                                        <h3 name="age">{bird.age}</h3>
                                        <label htmlFor="species" className={styles.label}>Species: </label>
                                        <h3>{bird.species}</h3>
                                    </div>
                                    <div className={styles.informationItem}>
                                        <label htmlFor="chipped" className={styles.label}>Chipped: </label>
                                        <h3>{bird.chipped ? "Chipped" : "Not Chipped"}</h3>
                                        <label htmlFor="lastCheckup" className={styles.label}>Last Checkup: </label>
                                        <h3>{bird.lastCheckup}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id={styles.description}>
                        <h5>{bird.description}</h5>
                    </div>
                <Card.Footer>
                    <div className={styles.grid}>
                        <div>
                            <h3 id={styles.addoptionStatus}>{bird.adopted ? "Addopted" : "Not Addopted"}</h3>
                        </div>
                        <div id={styles.buttons}>
                            {isAdmin[0] && <Link to={"/edit-bird/" + id}><Button style={styles.changeButton}>Change Information</Button></Link>}
                            {(bird.adopted === false) && <Button style={styles.adoptButton} onClick={adoptionHandler}>Adopt</Button> }
                        </div>
                    </div>
                </Card.Footer>
                </Card>
            </Layout>
        </>
    );
}