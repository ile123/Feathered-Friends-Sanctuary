import BirdListItem from '../../components/BirdListItem/BirdListItem';
import Layout from '../../components/UI/Layout/Layout';
import styles from './BirdList.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import BirdFilter from '../../components/BirdFilter/BirdFilter';

export default function BirdList() {

    const [birds,setBirds] = useState([]);
    const [filteredBirds, setFilteredBirds] = useState([]);

    useEffect(() => {
        axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/birds.json")
        .then((result: any) => createBirdsArray(result.data));
    }, []);

    const filterdBirdsHandler = (data: any) => {
        setFilteredBirds(data);
    }

    const createBirdsArray = (birdsObjects: any) => {
        const birdsArray:any = [];
        Object.keys(birdsObjects).map((key: any) => {
            birdsArray.push({
                ...birdsObjects[key],
                id: key
            });
        });
        setBirds(birdsArray);
        setFilteredBirds(birdsArray);
    }

    return(
        <>
            <Layout>
                <BirdFilter birds={birds} onFilterBirds={filterdBirdsHandler} />
                <div id={styles.grid}>
                    {filteredBirds.length === 0 ? <h3 id={styles.noBirds}>No birds where found!</h3> : 
                        filteredBirds.map((bird: any, index: number) => {
                            return <BirdListItem
                                key={index}
                                id={bird.id}
                                name={bird.name} 
                                url={bird.url} 
                                age={bird.age} 
                                chipped={bird.chipped} 
                                description={bird.description}
                                lastCheckup={bird.lastCheckup}
                                species={bird.species}
                                adopted={bird.adopted} />
                        })
                    }
                     <br />
                </div>
            </Layout>
        </>
    );
}