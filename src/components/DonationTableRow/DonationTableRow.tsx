import Button from '../UI/Button/Button'
import styles from './DonationTableRow.module.css'
import { AdminContext } from '../../App';
import {useContext} from 'react'
import axios from 'axios';

export default function DonationTableRow(props: any) {

    async function donateHandler() {
        const updatedData = { donationCategory: 'Donated' };
        await axios.patch(`https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations/${props.id}.json`, updatedData);
        await axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json")
            .then((result: any) => props.onAction(result.data));
    }

    async function deleteHandler() {
        await axios.delete(`https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations/${props.id}.json`);
        await axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json")
            .then((result: any) => props.onAction(result.data));
    }

    async function repeatHandler() {
        const newDonation = {
            description: props.description,
            type: props.type,
            value: props.value,
            donationCategory: "Needed"
        };
        await axios.post("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json", newDonation);
        await axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json")
            .then((result: any) => props.onAction(result.data));
    }

    const isAdmin:any = useContext(AdminContext);

    return(
        <>
            <tr id={styles.row}>
                <td className={styles.rowItem}>{props.index}</td>
                <td className={styles.rowItem}>{props.type}</td>
                <td className={styles.rowItem}>{props.value} $</td>
                <td className={styles.rowItem}>{props.description}</td>
                {
                    (props.donationType === "Needed") &&
                        <td className={styles.grid}>
                            <Button style={styles.acceptButton} onClick={donateHandler}>Donate</Button>
                            {isAdmin[0] && <Button style={styles.deleteButton} onClick={deleteHandler}>Delete</Button> }
                        </td>
                }
                {
                (props.donationType === "Offered" && isAdmin[0]) &&
                        <td className={styles.grid}>
                            <Button style={styles.acceptButton} onClick={donateHandler}>Accept</Button>
                        </td>
                }
                {
                    (props.donationType === "Donated" && isAdmin[0]) && 
                    <td className={styles.grid}>
                        <Button style={styles.acceptButton} onClick={repeatHandler}>Repeat</Button>
                        <Button style={styles.deleteButton} onClick={deleteHandler}>Delete</Button>
                    </td>
                }
            </tr>
        </>
    );
}