import { isPlayerOutside2 } from '../isPlayerOutside'
import { Position } from '../../client/features/types';
import { getCenter } from 'geolib'

it('should return false if player is not outside of the zone', () => {
    const nico: Position = { latitude : 45.5157, longitude: 0.3246262};
    const yael: Position = { latitude : 45.5156274, longitude: 0.3246257};
    const zoneCenterPosition: Position = getCenter([nico, yael]) as Position;
    const radius = 200
    
    expect(isPlayerOutside2(zoneCenterPosition, nico, radius)).toBeFalsy()
    expect(isPlayerOutside2(zoneCenterPosition, yael, radius)).toBeFalsy()
})

it('should return false if there is only one player', () => {
    const nico: Position = { latitude : 45.5157, longitude: 0.3246262};
    const zoneCenterPosition: Position = getCenter([nico]) as Position;

    const radius = 200
    
    expect(isPlayerOutside2(zoneCenterPosition, nico, radius)).toBeFalsy()
})

it.skip('should return false if player is not outside of the zone', () => {
    const pos1 = { latitude: 44.4082053, longitude: 0.7072568 } //Villeneuve
    const pos2 = { latitude: 48.8367195, longitude: 2.2923221 } //Paris
    const pos3 = { latitude: 43.300000, longitude: 5.400000} //Marseille
    const pos4 = { latitude: 47.21725, longitude: -1.55336} //Nantes
    const zoneCenterPosition: Position = getCenter([pos1, pos2, pos3, pos4]) as Position;

    const radius = 200
    
    expect(isPlayerOutside2(zoneCenterPosition, pos1, radius)).toBeTruthy()
    expect(isPlayerOutside2(zoneCenterPosition, pos2, radius)).toBeTruthy()
    expect(isPlayerOutside2(zoneCenterPosition, pos3, radius)).toBeTruthy()
    expect(isPlayerOutside2(zoneCenterPosition, pos4, radius)).toBeTruthy()
})
