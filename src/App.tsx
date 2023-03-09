import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Customer from './pages/Customer';
import Employee from './pages/Employee';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import FormCustomer from './pages/formCustomer/FormCustomer';
import FormEmployee from './pages/formEmployee/FormEmployee';
import FormSupplier from './pages/formSupplier/FormSupplier';
import Suppliers from './pages/Suppliers';
import Home from './pages/Home';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Home />
              <Redirect to="/page/customers" />
            </Route>
            <Route path="/page/customers" exact={true}>
              <Customer />
            </Route>
            <Route path="/page/create-customer" exact={true}>
              <FormCustomer />
            </Route>
            <Route path="/page/edit-customer/:id" exact={true}>
              <FormCustomer />
            </Route>

            <Route path="/page/employees" exact={true}>
              <Employee />
            </Route>
            <Route path="/page/create-employee" exact={true}>
              <FormEmployee />
            </Route>
            <Route path="/page/edit-employee/:id" exact={true}>
              <FormEmployee />
            </Route>

            <Route path="/page/suppliers" exact={true}>
              <Suppliers />
            </Route>
            <Route path="/page/create-supplier" exact={true}>
              <FormSupplier />
            </Route>
            <Route path="/page/edit-supplier/:id" exact={true}>
              <FormSupplier />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
