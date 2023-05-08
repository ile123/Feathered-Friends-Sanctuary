import styles from './SanctuaryInformation.module.css'
import Layout from '../../components/UI/Layout/Layout';
import { Card } from 'react-bootstrap';
import Button from '../../components/UI/Button/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function SanctuaryInformation() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const submitForm = (data: any) => {
        axios.post("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/messages.json", data);
        reset();
    }

    return(
        <>
            <Layout>
                <img src="https://wallpaperaccess.com/full/2114865.jpg" alt="Birds" id={styles.image} />
                <div id={styles.grid}>
                    <div className={styles.item}>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <Card id={styles.card}>
                                <h3 className={styles.label}>Email: </h3>
                                <input type="email" className={styles.input} {...register("email", { required: true })} />
                                <h3 className={styles.label}>Message: </h3>
                                <input type="text" className={styles.input} {...register("message", { required: true })} />
                                <Button style={styles.button} type={"submit"}>Send</Button>
                            </Card>
                        </form>
                    </div>
                    <div className={styles.item}>
                        <img src="src\assets\images\mapOfSplit.png" id={styles.map} />
                    </div>
                </div>
            </Layout>
        </>
    );
}