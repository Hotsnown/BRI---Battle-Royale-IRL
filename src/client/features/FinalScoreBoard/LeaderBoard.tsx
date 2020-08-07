import React from 'react'

import './LeaderBoard.css'

interface Player {
	userId: string,
	userName: string,
}

interface LeaderboardProps {
	data: Player[]
	title: string
	selfRank: number
}

interface LeaderboardState {

}

export class Leaderboard extends React.Component <LeaderboardProps, LeaderboardState> {
	render() {
		var data = this.props.data || []
		var rows = new Array(data.length > 10 ? 10 : data.length).fill(0).map((z, i) => {
			var id = data[i].userId,
				un = data[i].userName
			return (
				<li key={i}>
					<img alt= {"avatar"} src = {`https://api.adorable.io/avatars/285/${i}.io.png`} />
					<mark>{un}</mark>
					<small>{(i + 1).toString() + (i+1 === 1 ? "st" : (i+1 === 2) ? "nd" : "nth")}</small>
				</li>
			);
		});
		return (
            //src = https://codepen.io/poootaatoooo/pen/GGoRNq
            <div className='scroller'>
                <div className='leaderboard'>
                    <h1>{this.props.title + this.props.selfRank || 'Leaderboard'}</h1>
                    <ol>{rows}</ol>
                </div>
            </div>
		)
	}
}