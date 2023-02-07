import { IonButton, IonCard, IonCheckbox, IonCol, IonInput, IonItem, IonLabel, IonRow, IonTitle } from "@ionic/react"
import { useHistory, useLocation, useParams } from "react-router";
import { Customer } from "../../interfaces/Customer.interface";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from "react";

const FormCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation<{ pathname: string; }>();

  const initialValues: Customer = { name: "", email: "", phone: "", address: "" };

  let data = localStorage["data"];
  data = JSON.parse(data);
  const [values, setValues] = useState<Customer>(initialValues)
  const history = useHistory()

  useEffect(() => {
    if (id) {
      setValues(data.filter((data: { id: number; }) => data.id === parseInt(id))[0])
    }
  }, [history.location.pathname])

  const createCustomer = ()=>{
    values.id = Math.floor(Math.random() * 100)
    data.push(values)
    localStorage.setItem("data", JSON.stringify(data))
    
  }

  const editCustomer = (id: any)=>{
    let filterUser = data.filter((d: { id: any; }) => d.id !== id)
    filterUser.push(values)
    localStorage.setItem("data", JSON.stringify(filterUser))
  }

  return (
    <div>
      <IonCard>
        <IonTitle style={{padding: "18px 18px 0"}}>{pathname === "/page/create-customer"
          ? "Create new customer"
          : `Edit customer`}
        </IonTitle>
          <IonRow style={{ marginBottom: "36px"}}>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Fullname</IonLabel>
                <IonInput value={values.name}
                  onIonChange={e => values.name = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput value={values.email}
                  onIonChange={e => values.email = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Phone number</IonLabel>
                <IonInput value={values.phone}
                  onIonChange={e => values.phone = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput value={values.address}
                  onIonChange={e => values.address = String(e.detail.value)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow style={{ display: "flex", justifyContent: "space-around", margin: "36px 0 18px"}}>
            <IonButton onClick={ id ? () => editCustomer(values.id) : createCustomer } color={"success"}>{pathname === "/create-customer" ? "Create new customer" : "Save changes"}</IonButton>
            <IonButton color={"warning"}>Cancel</IonButton>
          </IonRow>    
      </IonCard>
    </div>
  )
}

export default FormCustomer;