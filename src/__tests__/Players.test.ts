import Players from "../Services/Players"
import Player from "../Services/Player"
import { getCenter } from 'geolib';


it("should create a list of players", () => {
    const participants = ["Nico", "JB", "Pierre", "Mylène"]
    const nico = new Player("Nico")
    const players = new Players(participants.map(participant => new Player(participant)))
    expect (players.members[0].name).toBe(nico.name)
    expect (players.getCenter()).toBe(!undefined)
})

it("should get center", () => {
    const pos1 = { latitude: 44.4082053, longitude: 0.7072568 } //Villeneuve
    const pos2 = { latitude: 48.8367195, longitude: 2.2923221 } //Paris
    const pos3 = { latitude: 43.300000, longitude: 5.400000} //Marseille
    const pos4 = { latitude: 47.21725, longitude: -1.55336} //Nantes
    const playerPositions = [pos1, pos2, pos3]

    const center = getCenter(playerPositions)
    console.log(center)
})