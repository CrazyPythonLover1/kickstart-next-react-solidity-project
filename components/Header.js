import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default class Header extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{marginTop:"10px"}}>
        <Link 
          route="/"
          name='browse'
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}
        >
          <a className="item"> CrowdCoin </a>
          
        </Link>

        {/* <Link
          name='submit'
          active={activeItem === 'submit'}
          onClick={this.handleItemClick}
        >
          <a className="item"> </a>

          Campaign
        </Link> */}

        <Menu.Menu position='right'>
          <Link
            route="/"
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
          <a className="item"> Campaigns  </a>
            
          </Link>

          <Link
            route="/campaigns/new"
            name='help'
            active={activeItem === 'help'}
            onClick={this.handleItemClick}
          >
          <a className="item"> +   </a>
            
          </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}