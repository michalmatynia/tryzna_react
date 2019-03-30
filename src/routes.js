import React from 'react';
import Layout from './Hoc/Layout';
import { Switch }  from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

/* Components */
import Home from './Components/Home';
import SignIn from './Components/signin';

/* Admin Components */
import Dashboard from './Components/admin/Dashboard';

import AdminHNavs from './Components/admin/hostnav';
import AddEditHNav from './Components/admin/hostnav/addEditHNav'

import AdminSlider from './Components/admin/slider';
import EditSlider from './Components/admin/slider/EditSlider'

import AdminDesc from './Components/admin/desc';
import EditDesc from './Components/admin/desc/EditDesc'

import AdminPortfolio from './Components/admin/portfolio';
import EditPortfolio from './Components/admin/portfolio/EditPortfolio';

/* Other Components */

import NotFound from './Components/ui/not_found'

const Routes = (props) => {

    return(
<Layout>
  <Switch>
  <PrivateRoute {...props} path="/admin_hostnav" exact component={AdminHNavs}/>
  <PrivateRoute {...props} path="/admin_hostnav/add_hnav" exact component={AddEditHNav}/>
  <PrivateRoute {...props} path="/admin_hostnav/edit_hnav/:id" exact component={AddEditHNav}/>

  <PrivateRoute {...props} path="/admin_slider" exact component={AdminSlider}/>
  <PrivateRoute {...props} path="/admin_slider/edit_slider/:id" exact component={EditSlider}/>
  <PrivateRoute {...props} path="/admin_slider/add_slider" exact component={EditSlider}/>

  <PrivateRoute {...props} path="/admin_desc" exact component={AdminDesc}/>
  <PrivateRoute {...props} path="/admin_desc/edit_desc/:id" exact component={EditDesc}/>
  <PrivateRoute {...props} path="/admin_desc/add_desc" exact component={EditDesc}/>

  <PrivateRoute {...props} path="/admin_portfolio" exact component={AdminPortfolio}/>
  <PrivateRoute {...props} path="/admin_portfolio/edit_portfolio/:id" exact component={EditPortfolio}/>
  <PrivateRoute {...props} path="/admin_portfolio/add_portfolio" exact component={EditPortfolio}/>

  <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
  <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />

  <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
  <PublicRoute {...props} restricted={false} exact component={NotFound} />

  </Switch>
</Layout> 
    )
  }
  
  export default Routes;