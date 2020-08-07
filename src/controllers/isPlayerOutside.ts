import { isPlayerOutside } from '../services/isPlayerOutside'
import { Position } from '../client/features/types'

export function isPlayerOutside2(zoneCenterPosition: Position, playerPosition: Position, radius: number): boolean {
    if (!zoneCenterPosition.latitude || !zoneCenterPosition.longitude) console.error('Zone center position is invalid')
    if (!playerPosition.latitude || ! playerPosition.longitude) console.error('Player position is invalid')
    
    return isPlayerOutside(zoneCenterPosition, playerPosition, radius)
}