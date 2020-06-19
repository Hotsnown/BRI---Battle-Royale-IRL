import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export class Ready extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {isReady: false}
        this.handleReady = this.handleReady.bind(this)
    }

    handleReady() {
        this.setState({isReady:true})
    }

    render () {

        const readyImgSrc = !this.state.isReady
        ? "/Ready.png"
        : "/Ready2.png"

    return (
    <>
    <Row className="justify-content-md-center">
        <Col></Col>
        <Col xs={8}>
            <div style= {{
                margin: 'auto',
                width:' 50%',
                padding: '70px 0',
            }}>
            <input type="image" height="50" width="100" src={readyImgSrc} onClick={this.handleReady}/>
            </div>
            {!this.state.isReady
            ? null
            : <h5 style={{color:"green"}}>En attente des autres joueurs</h5>}
        </Col>
        <Col></Col>
    </Row>
    </>
    )}
}
