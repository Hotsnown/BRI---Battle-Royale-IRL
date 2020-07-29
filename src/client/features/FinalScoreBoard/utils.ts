import { Player } from '../types'

export const rankPlayers = (players: Player[]): {first: Player, others: Player[], all: Player[]} => {
    if (!players) {
        console.error('No Player found')
        return {
            first: {username: 'Error', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:01:00 GMT')},
            others: [{username: 'Error', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:01:00 GMT')}],
            all: [{username: 'Error', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:01:00 GMT')}]
        }
    }
    const first = players.filter(player => player.deathHour === 'alive')[0]
    const others = players.filter(player => player.deathHour !== 'alive')
    return ({
        first: first,
        others: others.sort(player => new Date(player.deathHour).valueOf() + new Date(player.deathHour).valueOf()),
        all: [first, ...others]
})}

export const rankSelf = (rankedPlayers: Player[], self: Player): number => {
    if (!rankedPlayers) {
        console.error('No Player found')
        rankedPlayers = []
    }
    if (!self) {
        console.error('No self found')
        return -1
    }

    const foundSelf = rankedPlayers.find(player => player.uid === self.uid)!
    return rankedPlayers.indexOf(foundSelf) + 1
}

export const getGameDuration = (): Promise<number> => {
    return fetch('https://cors-anywhere.herokuapp.com/https://us-central1-pubg-irl-261413.cloudfunctions.net/Starttimer')
        .then(res => res.json())
        .then(res => {return res["data"]})
        .catch(err => console.error(err)) 
}