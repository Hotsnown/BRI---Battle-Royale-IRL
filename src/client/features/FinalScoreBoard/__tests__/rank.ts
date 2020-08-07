import { rankPlayers, rankSelf } from '../utils'
import { Player } from '../../types'

it('should give relative rank', () => {
    const players: Player[] = [
        {username: 'winner6', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:01:00 GMT')},
        {username: 'winner5', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:02:00 GMT')},
        {username: 'winner4', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:03:00 GMT')},
        {username: 'winner3', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:04:00 GMT')},
        {username: 'winner', isReady: true, isDead: false, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: 'alive'},
        {username: 'winner2', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:06:00 GMT')},
    ]
    expect(rankPlayers(players).first.username).toStrictEqual('winner')
    expect(rankPlayers(players).others[0].username).toStrictEqual('winner2')
    expect(rankPlayers(players).others[1].username).toStrictEqual('winner3')
    expect(rankPlayers(players).others[2].username).toStrictEqual('winner4')
    expect(rankPlayers(players).others[3].username).toStrictEqual('winner5')
    expect(rankPlayers(players).others[4].username).toStrictEqual('winner6')
})

it('should rank oneself', () => {
    const players: Player[] = [
        {username: 'winner6', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:01:00 GMT')},
        {username: 'winner5', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:02:00 GMT')},
        {username: 'winner4', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:03:00 GMT')},
        {username: 'winner3', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:04:00 GMT')},
        {username: 'winner', isReady: true, isDead: false, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: 'alive'},
        {username: 'winner2', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:06:00 GMT')},
    ]

    const rankedPlayers = rankPlayers(players).all

    const winner6 = {username: 'winner6', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:01:00 GMT')}
    const winner5 = {username: 'winner5', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:02:00 GMT')}
    const winner4 = {username: 'winner4', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:03:00 GMT')}
    const winner3 = {username: 'winner3', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:04:00 GMT')}
    const winner = {username: 'winner', isReady: true, isDead: false, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: 'alive'}
    const winner2 = {username: 'winner2', isReady: true, isDead: true, position: {latitude: 0, longitude: 0}, uid: '0000', deathHour: new Date('28 Jan 200 8:06:00 GMT')}
    
    expect(rankSelf(rankedPlayers, winner as Player)).toStrictEqual(1)
    expect(rankSelf(rankedPlayers, winner2)).toStrictEqual(2)
    expect(rankSelf(rankedPlayers, winner3)).toStrictEqual(3)
    expect(rankSelf(rankedPlayers, winner4)).toStrictEqual(4)
    expect(rankSelf(rankedPlayers, winner5)).toStrictEqual(5)
    expect(rankSelf(rankedPlayers, winner6)).toStrictEqual(6)
})