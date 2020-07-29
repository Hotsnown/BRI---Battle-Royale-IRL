import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ThemeContext from '../../themeContext';

interface ReadyProps {
}

interface ReadyState {
    isReady: boolean
}

export class Ready extends Component<ReadyProps, ReadyState> {
    constructor(props) {
        super(props)
        this.state = {
            isReady: false
        }
    }

    render() {

        const readyImgSrc = !this.state.isReady
            ? "/Ready.png"
            : "/Ready2.png"

        return (
            <>
                <ThemeContext.Consumer>
                    {value => (
                        <Row className="justify-content-md-center">
                            <Col></Col>
                            <Col xs={8}>
                                <div style={{
                                    margin: 'auto',
                                    width: ' 50%',
                                    padding: '70px 0',
                                }}>
                                    <input type="image" height="50" width="100" alt="ready button" src={readyImgSrc} onClick={() => {value.onHandleReady(); this.setState({isReady: true})}} />
                                </div>
                                {!this.state.isReady
                                    ? null
                                    : <h5 style={{ color: "green" }}>En attente des autres joueurs</h5>}
                            </Col>
                            <Col></Col>
                        </Row>
                    )}
                </ThemeContext.Consumer>
            </>
        )
    }
}
