import { Card } from 'react-bootstrap';
import styles from './BirdFilter.module.css'
import { useRef } from 'react';

export default function BirdFilter(props: any) {

    const filterSpeciesPrev = useRef('');
    const filterAdoptedPrev = useRef('');
    const birds = props.birds;

    const onChangeSpeciesHandler = (event: any) => {
        filterSpeciesPrev.current = event.target.value;
        filterBirds();
    }

    const onChangeAdoptedHandler = (event: any) => {
        filterAdoptedPrev.current = event.target.value;
        filterBirds();
    }

    const filterBasedOnName = (event: any) => {
        const name = event.target.value;
        const filteredBirds = birds.filter((bird: any) => bird.name.toLowerCase().includes(name.toLowerCase()));
        props.onFilterBirds(filteredBirds);
    }

    const filterBirds = () => {
        const filterSpecies: string = filterSpeciesPrev.current;
        const filterAdopted: string = filterAdoptedPrev.current;
        let filteredBirds: any;
        if(filterSpecies === "" && filterAdopted === "") {
            props.onFilterBirds(birds);
            return;
        }
        if(filterSpecies !== "" && filterAdopted !== "") {
            filteredBirds = birds.filter((bird: any) => bird.species === filterSpecies && (bird.adopted === JSON.parse(filterAdopted)));
        }
        if(filterSpecies === "") {
            filteredBirds = birds.filter((bird: any) => bird.adopted === JSON.parse(filterAdopted));
        }
        if(filterAdopted === "") {
            filteredBirds = birds.filter((bird: any) => bird.species === filterSpecies);
        }
        props.onFilterBirds(filteredBirds);
    }

    return(
        <>
            <Card id={styles.card}>
                <div id={styles.grid}>
                    <div className={styles.item}>
                    <select name="type" className={styles.select} onChange={onChangeSpeciesHandler}>
                        <option value="">All species</option>
                        <option value="Pigeon">Pigeon</option>
                        <option value="Indian Ringneck">Indian Ringneck</option>
                        <option value="African Grey">African Grey</option>
                        <option value="Crow">Crow</option>
                        <option value="Maccaw">Maccaw</option>
                        <option value="Lovebird">Lovebird</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Duck">Duck</option>
                    </select>
                    </div>
                    <div className={styles.item}>
                    <select name="type" className={styles.select} onChange={onChangeAdoptedHandler}>
                        <option value="">All adoption statuses</option>
                        <option value="true">Adopted</option>
                        <option value="false">Not Adopted</option>
                    </select>
                    </div>
                    <div className={styles.item}>
                        <input type="text" id={styles.nameSearch} placeholder='Insert bird name here....' onChange={filterBasedOnName} />
                    </div>
                </div>
            </Card>
        </>
    );
}