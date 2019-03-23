import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom'
import menuItems from './menuItems'

import { firebase } from '../../../firebase'


class MenuBar extends Component {
  constructor( props ) {
    super( props )
    this.state = {}
  }
// this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
handleClick( item ) {
    this.setState( prevState => ( 
      { [ item ]: !prevState[ item ] } 
    ) )
  }
// if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
handler( children ) {



    const { state } = this
return children.map( ( subOption, index ) => {

      if ( !subOption.children ) {
        return (
          <div className='admin_nav_subitem' key={ index }>
            <ListItem 
              button 
              key={ index }
              >
              <Link 
                to={ subOption.url }
                >
                <ListItemText 
                  primary={ subOption.name } 
                />
              </Link>
            </ListItem>
          </div>
        )
      }
      return (
        <div className='admin_nav_item' key={ index }>
          <ListItem 
            button 
            onClick={ () => this.handleClick( subOption.name ) }
            >
            <ListItemText 
              primary={ subOption.name } />
            { state[ subOption.name ] ? 
              <ExpandLess /> :
              <ExpandMore />
            }
          </ListItem>
          <Collapse 
            in={ state[ subOption.name ] } 
            timeout="auto" 
            unmountOnExit
          >
            { this.handler( subOption.children ) }
          </Collapse>
        </div>
      )
    } )
  }

  logoutHandler = () => {
    firebase.auth().signOut().then(() => {
        console.log('logout successful')
    }, (error) => {
        console.log('Error Logging out')
    })
  };

render() {
    return (
      <div>

            { this.handler( menuItems.data ) }
            <ListItem  className='admin_nav_subitem' button onClick={() => this.logoutHandler()}>
                    Log out                    
            </ListItem>
      </div>
    )
  }
}
export default MenuBar
