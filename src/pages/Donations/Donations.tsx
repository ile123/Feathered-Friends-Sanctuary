import styles from './Donations.module.css'
import Layout from '../../components/UI/Layout/Layout';
import FormModal from '../../components/FormModal/FormModal';
import { useState, useEffect, useContext } from 'react';
import Button from '../../components/UI/Button/Button';
import { AdminContext } from '../../App';
import axios from 'axios';
import DonationTable from '../../components/DonationTable/DonationTable';

export default function Donations() {
    const [showFormModal, setShowFormModal] = useState(false);
    const [neededDonations, setNeededDonations] = useState([]);
    const [offeredDonations, setOfferedDonations] = useState([]);
    const [donatedDonations, setDonatedDonations] = useState([]);
    const isAdmin:any = useContext(AdminContext);

    //implement these as a table, you already have the code from before

    const showAddDonationHandler = () => {
        setShowFormModal(!showFormModal);
    }

    const parseDonations = (data: any) => {

        const newNeededDonations:any = [];
        const newOfferedDonations:any = [];
        const newDonatedDonations:any = [];

        Object.keys(data).map((key: any) => {
            if(data[key].donationCategory === "Needed") {
                newNeededDonations.push({
                    ...data[key],
                    id: key
                });
            } else if (data[key].donationCategory === "Offered") {
                newOfferedDonations.push({
                    ...data[key],
                    id: key
                });
            } else {
                newDonatedDonations.push({
                    ...data[key],
                    id: key
                });
            }
        });
        setDonatedDonations(newDonatedDonations);
        setNeededDonations(newNeededDonations);
        setOfferedDonations(newOfferedDonations);
    }

    const onActionHandler = (data: any) => {
        parseDonations(data);
    }

    useEffect(() => {
        axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json")
            .then((result: any) => parseDonations(result.data));
    }, []);

    return(
        <>
        {showFormModal &&
            <FormModal onClose={showAddDonationHandler} onDonate={parseDonations} />
        }
            <Layout>
                <Button style={styles.button} onClick={showAddDonationHandler}>New Donation</Button>
                <div className={styles.tableSection}>
                    <h3 className={styles.label}>Needed: </h3>
                    {neededDonations.length === 0 ? <h2 className={styles.noDonations}>No needed donations found!</h2>
                        : <DonationTable donations={neededDonations} onAction={onActionHandler} />
                    }
                </div>
                <div className={styles.tableSection}>
                    <h3 className={styles.label}>Offered: </h3>
                    {offeredDonations.length === 0 ? <h2 className={styles.noDonations}>No offered donations found!</h2>
                        : <DonationTable donations={offeredDonations} onAction={onActionHandler} />
                    }
                </div>
                <div className={styles.tableSection}>
                    <h3 className={styles.label}>Donated: </h3>
                    {donatedDonations.length === 0 ? <h2 className={styles.noDonations}>No donated donations found!</h2>
                        : <DonationTable donations={donatedDonations} onAction={onActionHandler} />
                    }
                </div>
            </Layout>
        </>
    );
}