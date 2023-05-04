import styles from './NewBird.module.css'
import Layout from '../../components/UI/Layout/Layout';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import { useForm } from 'react-hook-form';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewBird() {

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    async function submitForm(data: any) {
        const submitedData = {
            name: data.name,
            species: data.species,
            chipped: data.chipped,
            age: data.age,
            lastCheckup: data.lastCheckup,
            description: data.description,
            url: data.url,
            adopted: false
        }
        await axios.post("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/birds.json", submitedData);
        navigate("/");
    }

    const handleError = (errors: any) => {
        const errorsArray:string[] = [];
        {Object.values(errors).map( (e: any) => {
            errorsArray.push(e.message);
        })}
        setFormErrors(errorsArray);
        setShowErrorModal(true);
    };

    const errorHandler = () => {
        setFormErrors([]);
        setShowErrorModal(false);
    }

    return(
        <>
        {showErrorModal && (
        <ErrorModal
          errors={formErrors}
          onConfirm={errorHandler}
        />)}
            <Layout>
                <Card id={styles.card}>
                    <Card.Title id={styles.cardTitle}>New bird</Card.Title>
                    <form onSubmit={handleSubmit(submitForm, handleError)}>
                        <div className={styles.inputField}>
                                    <h3>Name: </h3>
                                    <input type="text" {...register('name', { 
                                        required: {
                                            value: true,
                                            message: "ERROR: Name is required!"
                                        },
                                        minLength: {
                                            value: 2,
                                            message: "ERROR: Name to short!"
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "ERROR: Name to long!"
                                        },
                                        })} className={styles.input} />
                                </div>
                            <div className={styles.inputField}>
                                <div className={styles.grid}>
                                    <div className={styles.item}>
                                        <h3>Species: </h3>
                                        <select {...register('species', {
                                            required: {
                                                value: true,
                                                message: "ERROR: Species is requred!"
                                            },
                                        })} id={styles.species}>
                                            <option value="" disabled hidden>Please select species here!</option>
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
                                    <div id={styles.chippedDiv}>
                                        <h3>Chipped: </h3>
                                        <input type="checkbox" id={styles.checkbox} {...register("chipped")}/>
                                    </div>
                                </div>
                                </div>
                            </div>
                        <div className={styles.inputField}>
                            <div className={styles.grid}>
                                <div className={styles.item}>
                                    <h3>Age: </h3>
                                    <input type="number" className={styles.input} min={1} max={100} {...register("age", {
                                        required: {
                                            value: true,
                                            message: "ERROR: Age is required!"
                                        }
                                    })} />
                                </div>
                                <div className={styles.item}>
                                    <h3 id={styles.lastCheckup}>Last checkup: </h3>
                                    <input type="date" id={styles.date_field} {...register("lastCheckup", {
                                        required: {
                                            value: true,
                                            message: "ERROR: Last checkup date required!"
                                        }
                                    })} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.inputField}>
                        <div className={styles.grid}>
                            <div className={styles.item}>
                                <h3>Description: </h3>
                                <input type="text" className={styles.input} {...register("description", {
                                    minLength: {
                                        value: 5,
                                        message: "ERROR: The description is too short(min. 5 characters)!"
                                    }
                                })} />
                            </div>
                            <div className={styles.item}>
                                <h3>Image URL: </h3>
                                <input type="text" className={styles.input} {...register("url", {
                                    required: {
                                        value: true,
                                        message: "ERROR: Image url is required!"
                                    },
                                    pattern: {
                                        value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g,
                                        message: "ERROR: Invalid image url!"
                                    }
                                })} />
                            </div>
                        </div>
                        </div>
                        <Button style={styles.button} type={"submit"}>Submit</Button>
                    </form>
                </Card>
            </Layout>
        </>
    );
}