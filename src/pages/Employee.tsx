import { IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonIcon, IonCard, IonButton, useIonAlert } from '@ionic/react';
import { addCircle, closeOutline, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { deleteById, getAll } from '../connectApi/RequestApi';
import { IEmployee } from '../interfaces/Employe.interface';

const Employee: React.FC = () => {
	const initialValues = { name: "" };
	const [employees, setEmployees] = useState<IEmployee[]>();
	const history = useHistory();
	const [showAlert] = useIonAlert();
	const [showConfirm] = useIonAlert();
	
	useEffect(() => {
		const fetchData = async () => {
			const response = await getAll("employee");
			setEmployees(response)
		}
		fetchData()
	}, [])

	const createEmployee = () => {
		history.push("/page/create-employee")
	}

	const removeEmployee = (id: number) => {
		showAlert({
			header: "Are you sure?",
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
						const deleteEmployee = async () => {
							const response = await deleteById("employee", id.toString())
							if (response === 200) {
								showConfirm({
									header: 'Employee deleted process',
									message: 'Employee was deleted successfully',
									buttons: ['OK'],
								})
								setEmployees(employees?.filter(e => e.id !== id))
							} else {
								showConfirm({
									header: 'Failed delete',
									message: 'Employee cannot was deleted, please try again later',
									buttons: ['OK'],
								})
							}
						}
						deleteEmployee();
					},
				},
			]
		})
	}

	const editEmployee = (id: number) => {
		history.push("/page/edit-employee/" + id)
	}

	return (
		<div>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Module of employees</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
					</IonToolbar>
				</IonHeader>
				{/* <ExploreContainer name={name} /> */}
				<IonGrid>
					<IonCard>
						<div className='titleTable'>
							<IonTitle>List employees</IonTitle>
							<IonButton onClick={createEmployee} color={"success"} size="small">
								<IonIcon style={{ marginRight: "10px" }} icon={addCircle}></IonIcon>
								New employee
							</IonButton>
						</div>
						<IonRow className='headerTable'>
							<IonCol size='2'>Full Name</IonCol>
							<IonCol size='2'>Email</IonCol>
							<IonCol size='2'>Phone</IonCol>
							<IonCol size='3'>Address</IonCol>
							<IonCol size='1'>Salary</IonCol>
							<IonCol size='1'>Status</IonCol>
							<IonCol size='1'>Actions</IonCol>
						</IonRow>
						<div className="bodyTable">
							{Array.isArray(employees) && employees?.map((data, index) => (
								<IonRow key={index} className="cellTable">
									<IonCol size='2'>{data.name + data.lastname} </IonCol>
									<IonCol size='2'>{data.email}</IonCol>
									<IonCol size='2'>{data.phone}</IonCol>
									<IonCol size='3'>{data.address}</IonCol>
									<IonCol size='1'> $ {data.salary}</IonCol>
									<IonCol size='1'>{data.status}</IonCol>
									<IonCol size='1'>
										<div className='buttonsTable'>
											<IonIcon onClick={() => editEmployee(data.id || 0)} className='btn-edit' icon={pencil}></IonIcon>
											<IonIcon onClick={() => removeEmployee(data.id || 0)} className='btn-remove' icon={closeOutline}></IonIcon>
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

export default Employee;