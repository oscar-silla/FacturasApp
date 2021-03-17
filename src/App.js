import React from 'react';
import FacturasPage from './Pages/Facturas';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import FormCreateBillComponent from './components/formCreateBill';
import DetailBillComponent from './components/detailBill';
import EditBill from './components/editBill';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={FacturasPage} />
                    <Route exact path='/bills' component={FacturasPage} />
                    <Route exact path='/create' component={FormCreateBillComponent} />
                    <Route exact path='/detail/:id' component={DetailBillComponent} />
                    <Route exact path='/detail/edit/:id' component={EditBill} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;