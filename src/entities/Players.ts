import Player from "./Player";
import { getCenter } from 'geolib';

class Players {
    members: Player[]

    constructor(members:Player[]) {
        this.members = members
    }

    getCenter() {
        return getCenter(this.members.map(member => member.getPosition()))
    }
}

export default Players