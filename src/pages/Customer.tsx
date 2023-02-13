import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonIcon, IonCard, IonButton, useIonAlert } from '@ionic/react';
import { addCircle, closeOutline, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteById, getAll } from '../connectApi/RequestApi';
import { ICustomer } from '../interfaces/Customer.interface';

const Customer: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const history = useHistory()
  const [customers, setCustomers] = useState<ICustomer[]>();
  const [showAlert] = useIonAlert();
  const [showConfirm] = useIonAlert();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAll("customer");
      setCustomers(response)
    }
    fetchData()
  }, [])

  const editCustomer = (id: number) => {
    history.push("/page/edit-customer/" + id)
    window.location.reload()
  }

  const createCustomer = () => {
    history.push("/page/create-customer")
    window.location.reload()
  }

  const removeCustomer = (id: number) => {
    showAlert({
      header: "Are you sure?" ,
      cssClass: "alert-button-cancel",
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            const deleteCustomer = async () => {
              const response = await deleteById("customer", id.toString())
              if(response === 200){
                showConfirm({
                  header: 'Customer deleted process',
                  message: 'Customer was deleted successfully',
                  buttons: ['OK'],
                })
                setCustomers(customers?.filter(c => c.id !== id))
              } 
            }
            deleteCustomer();
          },
        },
      ]
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          </IonToolbar>
        </IonHeader>
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

export default Customer;
