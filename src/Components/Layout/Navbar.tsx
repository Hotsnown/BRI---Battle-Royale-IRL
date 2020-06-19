import React, { Component } from "react"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import NavItem from 'react-bootstrap/NavItem'

import DeletteAll from '../Notifications/Alert'

class Nav extends Component<any> {
    render() {
        return (
            <div>
                <Navbar bg="dark">
                    <img
                        src="/Logo_BRI.png"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                    />
            <Navbar.Toggle />
                <NavItem className="mx-auto order-0 p-1">
                    <DeletteAll></DeletteAll>
                </NavItem>
                <NavItem className="p-1">
                    <Button>
                        Survivants 
                        <Badge variant="light">{this.props.numberOfPlayerLeft}</Badge>
                        <span className="sr-only">unread messages</span>
                    </Button>
                </NavItem>
          </Navbar>
                       
           </div>
        )
    }
        
};

export default Nav