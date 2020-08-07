export interface Player {
    username: string
    isReady: boolean
    isDead: boolean
    position: Position
    uid: string
    deathHour: Date | 'alive'
}

export interface Game {
    players: Player[]
    isLive: boolean
    radius:  number
}

export type Position = { latitude: number; longitude: number };