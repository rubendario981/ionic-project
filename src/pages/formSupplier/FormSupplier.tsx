import { IonButton, IonButtons, IonCard, IonCol, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { create, getAll } from '../../connectApi/RequestApi';
import { ISupplier } from "../../interfaces/Supplier.interface";

const FormSupplier = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation<{ pathname: string }>();
  
  const [showAlert] = useIonAlert();
  const history = useHistory();
  const initialValues: ISupplier = { company: "", email: "", phone: "", contact: "", address: "", manager: "" }
  const [supplier, setSupplier] = useState<ISupplier>(initialValues)
  const [suppliers, setSuppliers] = useState<ISupplier[]>()

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await getAll("supplier");
        setSuppliers(response)
      }
      fetchData()
    }
  }, [id])

  useEffect(() => {
    if (id && suppliers) {
      setSupplier(suppliers?.filter(data => data.id === parseInt(id))[0])
    }
  }, [id, suppliers])
  
  const createOrEdit = async () => {
    const response = await create("supplier/", supplier);
    response === 200
    ? showAlert({
      header: 'Success process',
      message: id ? `Supplier was updated successfully` : `Supplier was created successfully`,
      buttons: ['OK'],
    })
    : showAlert({
      header: 'Process failed',
      message: id ? `Action to edit supplier has failed, please try again later` : `The proccess to create new supplier was failed, please try again later`,
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
        <IonTitle style={{ padding: "18px 18px 0" }}>{pathname === "/page/create-supplier"
          ? "Create new supplier"
          : `Edit supplier`}
        </IonTitle>
        <IonRow style={{ marginBottom: "14px" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Company name</IonLabel>
              <IonInput value={supplier?.company}
                onIonChange={e => supplier.company = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput value={supplier?.email}
                onIonChange={e => supplier.email = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow style={{ marginBottom: "14px" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput value={supplier.address}
                onIonChange={e => supplier.address = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Phone</IonLabel>
              <IonInput value={supplier.phone}
                onIonChange={e => supplier.phone = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow style={{ marginBottom: "14px" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Manager</IonLabel>
              <IonInput value={supplier.manager}
                onIonChange={e => supplier.manager = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Contact</IonLabel>
              <IonInput value={supplier.contact}
                onIonChange={e => supplier.contact = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow style={{ display: "flex", justifyContent: "space-around", margin: "36px 0 18px" }}>
          <IonButton onClick={createOrEdit} color={"success"}>{pathname.includes("create") ? "Create new supplier" : "Save changes"}</IonButton>
          <IonButton onClick={() => history.push("/page/suppliers")} color={"warning"}>Cancel</IonButton>
        </IonRow>
      </IonCard>
    </IonPage>
  )
}

export default FormSupplier