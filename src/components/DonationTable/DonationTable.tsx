import DonationTableRow from '../DonationTableRow/DonationTableRow';
import styles from './DonationTable.module.css'

export default function DonationTable(props: any) {
    
    const donations = props.donations;

    return(
        <>
            <table id={styles.table}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation: any, index: number) => {
                        <DonationTableRow key={index}  />
                    })}
                </tbody>
            </table>
        </>
    );
}