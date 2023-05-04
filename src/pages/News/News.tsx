import styles from './News.module.css'
import Layout from '../../components/UI/Layout/Layout';
import { useState, useEffect, useContext } from 'react';
import Button from '../../components/UI/Button/Button';
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AdminContext } from '../../App';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import NewsItem from '../../components/NewsItem/NewsItem';

export default function News() {
    const [showAddNews, setShowAddNews] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [news, setNews] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const isAdmin = useContext(AdminContext);

    const createNewsArray = (newsObjects: any) => {
        const newsArray:any = [];
        Object.keys(newsObjects).map((key: any) => {
            newsArray.push({
                ...newsObjects[key],
                id: key
            });
        });
        setNews(newsArray);
    }

    const showAddNewsHandler = () => {
        setShowAddNews(!showAddNews);
    }

    async function submitForm(data:any) {
        const important = (data.important === undefined)
        const submitData = {
            title: data.title,
            content: data.content,
            important: (important ? false : data.important),
            dateOfCreation: new Date().toUTCString().slice(5, 16)
        }
        await axios.post("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/news.json", submitData)
            .catch((error: any) => console.log(error));
        await axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/news.json")
            .then((result: any) => createNewsArray(result.data))
            .catch((error: any) => console.log(error));
        setShowAddNews(false);
        reset();
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

    const newsDeletionHandler = (data: any) => {
        createNewsArray(data);
    }

    useEffect(() => {
        axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/news.json")
        .then((result: any) => createNewsArray(result.data));
    }, []);

    return(
        <>
            {showErrorModal && (
            <ErrorModal
            errors={formErrors}
            onConfirm={errorHandler}
            />)}
            <Layout>
                <div className={styles.grid}>
                    <div className={styles.item}>
                        <Button style={styles.button} onClick={showAddNewsHandler}>New news</Button>
                    </div>
                    <div className={styles.item}>
                        {showAddNews &&
                            <form onSubmit={handleSubmit(submitForm, handleError)}>
                                <Card id={styles.formCard}>
                                    <h4 className={styles.label}>Title: </h4>
                                    <input type="text" {...register("title", {
                                        required: {
                                            value: true,
                                            message: "ERROR: Title is required!"
                                        }
                                    })} className={styles.input} />
                                    <h4 className={styles.label}>Content: </h4>
                                    <input type="text" {...register("content", {
                                        required: {
                                            value: true,
                                            message: "ERROR: Content is required!"
                                        }
                                    })} className={styles.input} />
                                    <div className={styles.grid}>
                                        {isAdmin[0] && 
                                            <div id={styles.checkoxItem}>
                                                <h4 id={styles.checkboxLabel}>Important: </h4>
                                                <input type="checkbox" {...register("important")} id={styles.checkboxInput} />
                                            </div>
                                        }
                                        <div className={styles.item}>
                                            <Button style={styles.saveButton} type={"submit"} >Submit</Button>
                                        </div>
                                    </div>
                                </Card>
                            </form> }
                    </div>
                </div>
                {!news && <h3 id={styles.noNews}>There are no news to be read!</h3>}
                {news &&
                <div>
                    <h3 id={styles.news}>NEWS</h3>
                    {news.map((newsItem: any, index: any) => (
                        <NewsItem 
                            key={index} 
                            id={newsItem.id} 
                            title={newsItem.title} 
                            content={newsItem.content}
                            important={newsItem.important}
                            dateOfCreation={newsItem.dateOfCreation}
                            onNewsDelete={newsDeletionHandler}  />
                    ))}
                </div>
                }
            </Layout>
        </>
    );
}