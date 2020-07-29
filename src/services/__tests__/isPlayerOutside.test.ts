import { isPlayerOutside } from '../isPlayerOutside'
import { Position } from '../../entities/Position';

it('should return true if player is outside of the zone', () => {
    const zoneCenterPosition: Position = { latitude: 200, longitude: 300 };
    const playerPosition: Position = { latitude : 200, longitude: 300};
    const radius = 200
    
    expect(isPlayerOutside(zoneCenterPosition, playerPosition, radius)).toBeTruthy()
})