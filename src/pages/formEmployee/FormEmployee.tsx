import { IonButton, IonButtons, IonCard, IonCol, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { create, getAll } from '../../connectApi/RequestApi';
import { IEmployee } from "../../interfaces/Employe.interface";

const FormEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation<{ pathname: string; }>();

  const [showAlert] = useIonAlert();
  const history = useHistory();
  const initialValues: IEmployee = { name: "", lastname: "", email: "", phone: "", address: "", salary: 0, status: "" }
  const [employee, setEmployee] = useState<IEmployee>(initialValues)
  const [employees, setEmployees] = useState<IEmployee[]>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAll("employee");
      setEmployees(response)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (id && employees) {
      setEmployee(employees.filter(data => data.id === parseInt(id))[0])
    }
  }, [id, employees])


  const createOrEdit = async () => {
    const response = await create("employee", employee)    
    response === 200
      ? showAlert({
        header: 'Success process',
        message: id ? 'Employee was updated successfully' : 'Employee was created successfully',
        buttons: ['OK'],
      })
      : showAlert({
        header: 'Process failed',
        message: id ? 'The proccess to update employee data was failed, please try again later' : 'The proccess to create new employee was failed, please try again later',
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
        <IonTitle style={{ padding: "18px 18px 0" }}>{pathname === "/page/create-employee"
          ? "Create new employee"
          : `Edit employee`}
        </IonTitle>
        <IonRow style={{ marginBottom: "14px" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput value={employee?.name}
                onIonChange={e => employee.name = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Lastname</IonLabel>
              <IonInput value={employee?.lastname}
                onIonChange={e => employee.lastname = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow style={{ marginBottom: "14px" }}>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Address</IonLabel>
              <IonInput value={employee.address}
                onIonChange={e => employee.address = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput value={employee.email}
                onIonChange={e => employee.email = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>          
        </IonRow>
        <IonRow style={{ marginBottom: "14px" }}>
        <IonCol>
            <IonItem>
              <IonLabel position="floating">Phone number</IonLabel>
              <IonInput value={employee.phone}
                onIonChange={e => employee.phone = String(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Salary</IonLabel>
              <IonInput value={employee.salary}
                onIonChange={e => employee.salary = Number(e.detail.value)}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Status</IonLabel>
              <IonSelect interface="popover" placeholder="Select status">
                <IonSelectOption value="Active">Active</IonSelectOption>
                <IonSelectOption value="Inactive">Inactive</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
        </IonRow>
        

        <IonRow style={{ display: "flex", justifyContent: "space-around", margin: "36px 0 18px" }}>
          <IonButton onClick={createOrEdit} color={"success"}>{pathname.includes("create") ? "Create new employee" : "Save changes"}</IonButton>
          <IonButton onClick={() => history.push("/page/employees")} color={"warning"}>Cancel</IonButton>
        </IonRow>
      </IonCard>
    </IonPage>
  )
}

export default FormEmployee