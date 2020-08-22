import { getDistance } from 'geolib';
import { Position } from '../client/features/types';

export function isPlayerOutside(zoneCenterPosition: Position, playerPosition: Position, radius: number): boolean {
    const distanceFromCenterToPlayer = getDistance(
        { lat: zoneCenterPosition.latitude, lng: zoneCenterPosition.longitude },
        { lat: playerPosition.latitude, lng: playerPosition.longitude }
    )    
    if (distanceFromCenterToPlayer > radius) {
        return true
    } else {
        return false
    }
}