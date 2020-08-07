import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ThemeContext from '../../themeContext';
import { hashHistory } from 'react-router'
import firebaseApp from '../../../config/firebase/Firebase'
import { updatePlayer } from '../../../infra/persistence/update'

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

    componentDidMount() {
        firebaseApp.database().ref('game/isLive')
          .on('value', function (snapshot) {
            const isLive = snapshot?.val()
            if (isLive) {
              hashHistory.push('/battlefield')
            }
          });
      }

    render() {

        const readyImgSrc = !this.state.isReady
            ? "/Ready.png"
            : "/Ready2.png";

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
                                    <input type="image" height="50" width="100" alt="ready button" src={readyImgSrc} onClick={() => {updatePlayer(firebaseApp, {...value.self, isReady: true}); this.setState({isReady: true})}} />
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
