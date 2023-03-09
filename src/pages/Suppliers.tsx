import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonIcon, IonCard, IonButton, useIonAlert } from '@ionic/react';
import { addCircle, closeOutline, pencil } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { deleteById, getAll } from '../connectApi/RequestApi';
import { ISupplier } from "../interfaces/Supplier.interface";

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>()
  const history = useHistory();  
	const [showAlert] = useIonAlert();
	const [showConfirm] = useIonAlert();
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAll("supplier");
      setSuppliers(response)
    }
    fetchData()
  }, [history.location.pathname])

  const createSupplier = () => {    
		history.push("/page/create-supplier")
  }
  
  const editSupplier = (id: number) => {
    history.push("/page/edit-supplier/" + id)
    
  }
  const removeSupplier = (id: number) => {
    showAlert({
			header: "Are you sure?",
			cssClass: "alert-button-cancel",
			buttons: [
				{
					text: 'No',
				},
				{
					text: 'Yes',
					handler: () => {
						const deleteSupplier = async () => {
							const response = await deleteById("supplier", id.toString())
							if (response === 200) {
								showConfirm({
									header: 'Supplier deleted process',
									message: 'Supplier was deleted successfully',
									buttons: ['OK'],
								})
								setSuppliers(suppliers?.filter(s => s.id !== id))
							} else {
								showConfirm({
									header: 'Failed delete',
									message: 'Supplier cannot was deleted, please try again later',
									buttons: ['OK'],
								})
							}
						}
						deleteSupplier();
					},
				},
			]
		})
  }
  return (
    <div>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Module of suppliers</IonTitle>
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
              <IonTitle>List suppliers</IonTitle>
              <IonButton onClick={createSupplier} color={"success"} size="small">
                <IonIcon style={{ marginRight: "10px" }} icon={addCircle}></IonIcon>
                New supplier
              </IonButton>
            </div>
            <IonRow className='headerTable'>
              <IonCol size='2'>Company</IonCol>
              <IonCol size='2'>Email</IonCol>
              <IonCol size='1'>Phone</IonCol>
              <IonCol size='2'>Address</IonCol>
              <IonCol size='2'>Manager</IonCol>
              <IonCol size='2'>Contact</IonCol>
              <IonCol size='1'>Actions</IonCol>
            </IonRow>
            <div className="bodyTable">
              {Array.isArray(suppliers) && suppliers?.map((data, index) => (
                <IonRow key={index} className="cellTable">
                  <IonCol size='2'>{data.company} </IonCol>
                  <IonCol size='2'>{data.email}</IonCol>
                  <IonCol size='1'>{data.phone}</IonCol>
                  <IonCol size='2'>{data.address}</IonCol>
                  <IonCol size='2'>{data.manager}</IonCol>
                  <IonCol size='2'>{data.contact}</IonCol>
                  <IonCol size='1'>
                    <div className='buttonsTable'>
                      <IonIcon onClick={() => editSupplier(data.id || 0)} className='btn-edit' icon={pencil}></IonIcon>
                      <IonIcon onClick={() => removeSupplier(data.id || 0)} className='btn-remove' icon={closeOutline}></IonIcon>
                    </div>
                  </IonCol>
                </IonRow>

              ))}
            </div>
          </IonCard>


        </IonGrid>
      </IonContent>
    </div>
  )
}

export default Suppliers;