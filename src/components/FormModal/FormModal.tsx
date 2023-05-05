import ReactDOM from 'react-dom';
import Button from '../UI/Button/Button';
import styles from './FormModal.module.css'
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AdminContext } from '../../App';
import { useState, useEffect, useContext } from 'react';

const Backdrop = (props: any) =>{
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props: any) =>{

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const isAdmin:any = useContext(AdminContext);

  async function submitForm(data:any) {
    const category = data.donationCategory === undefined ? "Offered" : data.donationCategory;
    const submitedData = {
      donationCategory: category,
      type: data.type,
      value: data.value,
      description: data.description
    }
    await axios.post("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json", submitedData);
    await axios.get("https://react-junior-dev-default-rtdb.europe-west1.firebasedatabase.app/donations.json")  
      .then((result: any) => props.onDonate(result.data));
    props.onClose();
    reset();
  }

  return (
    <Card className={styles.modal}>
      <form onSubmit={handleSubmit(submitForm)}>
        <Card.Header className={styles.header}>
          <h2>New Donation</h2>
        </Card.Header>
        <div className={styles.content}>
              <div className={styles.grid}>
                <div className={styles.item}>
                    <h3>Value: </h3>
                    <input type="number" min={1} {...register("value")} className={styles.input} required />
                </div>
                <div className={styles.item}>
                    <h3>Type: </h3>
                    <select {...register('type')} className={styles.input} required>
                      <option value="" disabled hidden>Please select what type of item you are donating!</option>
                      <option value="Food">Food</option>
                      <option value="Toy">Toys</option>
                      <option value="Cage">Cages</option>
                      <option value="Perches">Perches</option>
                      <option value="Wateres">Wateres</option>
                      <option value="Feeders">Feeders</option>
                      <option value="Liner">Liner</option>
                      <option value="Litter">Litter</option>
                    </select>
                </div>
              </div>
              <div className={styles.grid}>
                <div className={styles.item}>
                    <h3>Description: </h3>
                    <input type="text" {...register("description")} className={styles.input} />
                </div>
                { isAdmin[0] &&
                  <div className={styles.item}>
                      <h3>Donation Category: </h3>
                      <select {...register('donationCategory')} className={styles.input} required>
                      <option value="Needed">Needed</option>
                      <option value="Offered">Offered</option>
                      <option value="Donated">Donated</option>
                    </select>
                  </div>
                }
              </div>
        </div>
        <Card.Footer className={styles.actions}>
            <div className={styles.grid}>
              <div className={styles.item}>
                <Button style={styles.closeButton} onClick={props.onClose} type={"button"}>Go Back</Button>
              </div>
              <div className={styles.item}>
                <Button style={styles.submitButton} type={"submit"}>Submit</Button>
              </div>
            </div>
        </Card.Footer>
      </form>
      </Card>
  );
};

export default function FormModal(props: any) {
  const backdropRoot: any = document.getElementById('backdrop-root');
  const overlayRoot: any = document.getElementById('overlay-root')

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, backdropRoot)}
      {ReactDOM.createPortal(<ModalOverlay onClose={props.onClose} onDonate={props.onDonate} />, overlayRoot)}
    </>
  );
}