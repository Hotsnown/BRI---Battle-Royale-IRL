import React, { Component } from 'react'

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

        const src = !this.state.isReady
        ? "/Ready.png"
        : "/Ready2.png"

    return(
    <>
        <input type="image" height="50" width="100" src={src} onClick={this.handleReady}/>
        {!this.state.isReady
        ? null
        : <h5 style={{color:"green"}}>En attente des autres joueurs</h5>}
    </>
    )}
}
