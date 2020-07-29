import { getDistance } from 'geolib';
import { Position } from '../entities/Position';

export function isPlayerOutside(zoneCenterPosition: Position, playerPosition: Position, radius: number): boolean {
    
    const distanceFromCenterToPlayer = getDistance(
        { lat: zoneCenterPosition.latitude, lng: zoneCenterPosition.longitude },
        { lat: playerPosition.latitude, lng: playerPosition.longitude }
    )
    
    if (distanceFromCenterToPlayer > radius) {
        console.log(`Courez!! vous êtes à ${distanceFromCenterToPlayer} mètres du centre`)
        return true
    }
    
    return false
}