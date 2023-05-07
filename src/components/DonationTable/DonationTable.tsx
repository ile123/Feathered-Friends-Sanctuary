import DonationTableRow from '../DonationTableRow/DonationTableRow';
import styles from './DonationTable.module.css'

export default function DonationTable(props: any) {

    const donations = props.donations;

    const onActionHandler = (data: any) => {
        props.onAction(data);
    }

    return(
        <>
            <table id={styles.table}>
                <thead id={styles.head}>
                    <tr>
                        <th className={styles.headItem}>#</th>
                        <th className={styles.headItem}>Type</th>
                        <th className={styles.headItem}>Value</th>
                        <th className={styles.headItem}>Description</th>
                        <th className={styles.headItem}>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation: any, index: number) => {
                        return (<DonationTableRow 
                            key={index}
                            index={index}
                            id={donation.id}
                            description={donation.description}
                            type={donation.type}
                            value={donation.value}
                            donationType={donation.donationCategory}
                            onAction={onActionHandler}  />);
                    })}
                </tbody>
            </table>
        </>
    );
}