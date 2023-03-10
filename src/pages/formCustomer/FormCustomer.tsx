import { IonButton, IonButtons, IonCard, IonCol, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useHistory, useLocation, useParams } from "react-router";
import { ICustomer } from "../../interfaces/Customer.interface";
import { useEffect, useState } from "react";
import { create, getAll } from "../../connectApi/RequestApi";

const FormCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation<{ pathname: string; }>();
  const [showAlert] = useIonAlert();
  const history = useHistory();

  // Data to load a customer if id is pass by param
  const initialValues: ICustomer = { name: "", email: "", phone: "", address: "" };
  const [customer, setCustomer] = useState<ICustomer>(initialValues)

  const [customers, setCustomers] = useState<ICustomer[]>()

  useEffect(() => {
    if(id){
      const fetchData = async () => {
        const response = await getAll("customer");
        setCustomers(response)
      }
      fetchData()
    }
  }, [id])

  useEffect(() => {
    if (id && customers) {
      setCustomer(customers.filter(data => data.id === parseInt(id))[0])
    }
  }, [id, customers])

  const createOrEdit = async () => {
    const response = await create("customer", customer)
    response === 200
      ? showAlert({
        header: 'Success process',
        message: id ? 'Customer was updated successfully' : 'Customer was created successfully',
        buttons: ['OK'],
      })
      : showAlert({
        header: 'Process failed',
        message: id ? 'The proccess to update customer was failed, please try again later' : 'The proccess to create new customer was failed, please try again later',
        buttons: ['OK'],
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
      <IonCard>
        <IonTitle style={{ padding: "18px 18px 0" }}>{pathname === "/page/create-customer"
          ? "Create new customer"
          : `Edit customer`}
        </IonTitle>
        <IonRow style={{ marginBottom: "36px" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Fullname</IonLabel>
              <IonInput value={customer.name}
                onIonChange={e => customer.name = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput value={customer.email}
                onIonChange={e => customer.email = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Phone number</IonLabel>
              <IonInput value={customer.phone}
                onIonChange={e => customer.phone = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <IonInput value={customer.address}
                onIonChange={e => customer.address = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow style={{ display: "flex", justifyContent: "space-around", margin: "36px 0 18px" }}>
          <IonButton onClick={createOrEdit} color={"success"}>{pathname === "/create-customer" ? "Create new customer" : "Save changes"}</IonButton>
          <IonButton onClick={()=> history.push("/page/customers")} color={"warning"}>Cancel</IonButton>
        </IonRow>
      </IonCard>
    </IonPage>
  )
}

export default FormCustomer;