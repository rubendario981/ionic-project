import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonIcon, IonPopover, IonCard, IonButton } from '@ionic/react';
import { addCircle, closeOutline, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { Customer } from '../interfaces/Customer.interface';
import './Page.css';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [customers, setCustomers] = useState<Customer[]>()

  const testData = [
    { id: 1, name: "ruben dario guzman gonzalez", email: "rubendario981@hotmail.com", phone: "3177917132", address: "avninda siempre viva 843" },
    { id: 2, name: "musa", email: "otro mail", phone: "6013325889", address: "avninda siempre viva 843" },
    { id: 3, name: "fito", email: "mail.com", phone: "41564", address: "avninda siempre viva 843" },
  ]
  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(testData))
      setCustomers(testData)
    } else {
      let data = localStorage["data"];
      data = JSON.parse(data);
      setCustomers(data)
    }

  }, [])

  const history = useHistory()
  const editCustomer = (id: number) => {
    history.push("/page/edit-customer/" + id)
    window.location.reload()
  }

  const createCustomer = () => {
    history.push("/page/create-customer")
    window.location.reload()
  }

  const removeCustomer = (id: number) => {
    let listLocalStorage = localStorage["data"]
    listLocalStorage = JSON.parse(listLocalStorage)
    const newList = listLocalStorage.filter((d: { id: number; }) => d.id !== id)
    localStorage.setItem("data", JSON.stringify(newList))
    window.location.reload()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name={name} /> */}
        <IonGrid>
          <IonCard>
            <div className='titleTable'>
              <IonTitle>List customers</IonTitle>
              <IonButton onClick={createCustomer} color={"success"} size="small">
                <IonIcon style={{ marginRight: "10px" }} icon={addCircle}></IonIcon>
                New customer
              </IonButton>
            </div>
            <IonRow className='headerTable'>
              <IonCol size='3'>Full Name</IonCol>
              <IonCol size='3'>Email</IonCol>
              <IonCol size='2'>Phone</IonCol>
              <IonCol size='3'>Address</IonCol>
              <IonCol size='1'>Actions</IonCol>
            </IonRow>
            <div className="bodyTable">
              {customers?.map((data, index) => (
                <IonRow key={index} className="cellTable">
                  <IonCol size='3'>{data.name}</IonCol>
                  <IonCol size='3'>{data.email}</IonCol>
                  <IonCol size='2'>{data.phone}</IonCol>
                  <IonCol size='3'>{data.address}</IonCol>
                  <IonCol size='1'>
                    <div className='buttonsTable'>
                      <IonIcon onClick={() => editCustomer(data.id || 0)} className='btn-edit' icon={pencil}></IonIcon>
                      <IonIcon onClick={() => removeCustomer(data.id || 3)} className='btn-remove' icon={closeOutline}></IonIcon>
                    </div>
                  </IonCol>
                </IonRow>

              ))}
            </div>
          </IonCard>


        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Page;
