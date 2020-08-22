import { isPlayerOutside } from '../services/isPlayerOutside'
import { Position } from '../client/features/types'

export function isPlayerOutside2(zoneCenterPosition: Position, playerPosition: Position, radius: number): boolean {
    if (!zoneCenterPosition.latitude || !zoneCenterPosition.longitude) {console.error('Zone center position is invalid'); return false}
    if (!playerPosition.latitude || ! playerPosition.longitude) {console.error('Player position is invalid'); return false}
    if (!radius || ! radius) {console.error('Radius is invalid'); return false}
    
    if (playerPosition.latitude === 0 && playerPosition.longitude === 0) return false
    
    return isPlayerOutside(zoneCenterPosition, playerPosition, radius)
}