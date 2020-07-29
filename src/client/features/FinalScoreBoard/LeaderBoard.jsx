import React from 'react'

import './LeaderBoard.css'

class Leaderboard extends React.Component {
	render() {
		var data = this.props.data || [],
			rows = [];
		var rows = new Array(data.length > 10 ? 10 : data.length).fill(0).map((z, i) => {
			var id = data[i].userId,
				un = data[i].userName,
				en = data[i].earnings,
				oc = () => {
					window.open('http://www.rewards1.com/forums-profile.php?user_id=' + id, '_blank')
				};
			return (
				<li key={i} onClick={oc}>
					<img src={'http://www.rewards1.com/uploads/avatar/' + id + '.jpg'} onError={e => e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
					<mark>{un}</mark>
					<small>{en.toFixed(2)}</small>
				</li>
			);
		});
		return (
            //src = https://codepen.io/poootaatoooo/pen/GGoRNq
            <div className='scroller'>
                <div className='leaderboard'>
                    <h1>{this.props.title || 'Leaderboard'}</h1>
                    <ol>{rows}</ol>
                </div>
            </div>
		)
	}
}

export class LeaderBoardTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		setTimeout(() => this.update([
			{ userId: 3405462, userName: 'LiMiTx', earnings: 1000},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500},
			{ userId: 203, userName: 'bean', earnings: 500}
		]), 500);
	}

	update(data) {
		this.setState({ data: data });
	}

	render() {
		return <Leaderboard title='Leaderboard' data={this.state.data} />
	}

}