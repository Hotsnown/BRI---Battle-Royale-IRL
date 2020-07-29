import { Position } from "../../entities/Position";

export interface Player {
    username: string
    isReady: boolean
    isDead: boolean
    position: Position
    uid: string
    deathHour: Date | 'alive'
}

export interface Game {
    isGameEnded: boolean
    players: Player[]
    isLive: boolean
}