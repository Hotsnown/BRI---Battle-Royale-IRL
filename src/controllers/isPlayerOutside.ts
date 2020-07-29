import { isPlayerOutside } from '../services/isPlayerOutside'
import { Position } from '../entities/Position'

const getRadius = (): Promise<number> => {
    return fetch('https://cors-anywhere.herokuapp.com/https://us-central1-pubg-irl-261413.cloudfunctions.net/Starttimer')
        .then(res => res.json())
        .then(res => res["data"])
        .catch(err => console.error(err))
    }

export async function isPlayerOutside2(zoneCenterPosition: Position, playerPosition: Position) {
    return isPlayerOutside(zoneCenterPosition, playerPosition, await getRadius())
}