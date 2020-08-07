import { getDistance } from 'geolib';
import { Position } from '../client/features/types'

class Player {
    name: string
    isDead: boolean
    distanceJoueurCentre: number
    isInside:boolean

    constructor (name:string) {
        this.name = name
        this.isDead = false
        this.distanceJoueurCentre = 0
        this.isInside = true
    }

    notify () {
        return null
    }

    getPosition () {
        return { latitude: 44.4082053, longitude: 0.7072568 }
    }

    isOutside(rayon:number) {
        if (this.distanceJoueurCentre > rayon) {
            return true
        }
    }
}

export default Player