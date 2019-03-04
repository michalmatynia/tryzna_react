import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route }  from 'react-router-dom';

import Home from './Components/Home';

const Routes = (props) => {
    return(
      <Layout>
          <Switch>
              <Route exact component={Home} path="/"/>
          </Switch>
      </Layout>
    )
  }
  
  export default Routes;