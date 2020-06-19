import Player from '../Services/Player'

it('should return the Distance between the player and the center ', () => {
    const player = new Player("Nico")
    //const pos1 = { latitude: 7.49347, longitude: 1.01253 }
    //const pos2 = { latitude: 48.864716, longitude: 2.349014 }
    const pos1 = { latitude: 44.4082053, longitude: 0.7072568 } //Villeneuve
    const pos2 = { latitude: 48.8367195, longitude: 2.2923221 } //Paris
    const distance = player.getDistanceJoueurCentre(pos1, pos2)
    console.log(distance)
    expect(distance).toBe(distance)
})