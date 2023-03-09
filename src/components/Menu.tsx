import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { people, peopleOutline, person, personOutline, storefront, storefrontOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Customers',
    url: '/page/customers',
    iosIcon: peopleOutline,
    mdIcon: people
  },
  {
    title: 'Employees',
    url: '/page/employees',
    iosIcon: personOutline,
    mdIcon: person
  },
  {
    title: 'Suppliers',
    url: '/page/suppliers',
    iosIcon: storefrontOutline,
    mdIcon: storefront
  }
];


const Menu: React.FC = () => {
  const location = useLocation();
  
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>System management</IonListHeader>
          <IonNote>CRUD - Modules</IonNote>
          {Array.isArray(appPages) && appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>

              </IonItem>
            </IonMenuToggle>
          ))}

        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
