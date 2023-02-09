import { IonButton, IonCard, IonCol, IonInput, IonItem, IonLabel, IonRow, IonTitle, useIonAlert } from "@ionic/react"
import { useLocation, useParams } from "react-router";
import { Customer } from "../../interfaces/Customer.interface";
import { useEffect, useState } from "react";
import { create, getAll } from "../../connectApi/RequestApi";

const FormCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation<{ pathname: string; }>();
  const [showAlert] = useIonAlert();

  const initialValues: Customer = { name: "", email: "", phone: "", address: "" };

  const [customers, setCustomers] = useState<Customer[]>()
  const [customer, setCustomer] = useState<Customer>(initialValues)

  useEffect(() => {
    if(id){
      const fetchData = async () => {
        const response = await getAll("customer");
        setCustomers(response)
      }
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (id && customers) {
      setCustomer(customers.filter(data => data.id === parseInt(id))[0])
    }
  }, [customers])

  const createCustomer = async () => {
    const response = await create("customer", customer)
    response === 200
      ? showAlert({
        header: 'Success process',
        message: 'Customer was created successfully',
        buttons: ['OK'],
      })
      : showAlert({
        header: 'Process failed',
        message: 'The proccess to create new customer was failed, please try again later',
        buttons: ['OK'],
      })
  }

  const editCustomer = (id: any): void => {
    console.log("The feature comming soon will be completed")
    
  }

  return (
    <div>
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
          <IonButton onClick={id ? () => editCustomer(customer.id) : createCustomer} color={"success"}>{pathname === "/create-customer" ? "Create new customer" : "Save changes"}</IonButton>
          <IonButton color={"warning"}>Cancel</IonButton>
        </IonRow>
      </IonCard>
    </div>
  )
}

export default FormCustomer;