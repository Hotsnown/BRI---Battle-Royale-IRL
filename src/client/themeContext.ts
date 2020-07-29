import React from 'react';
import { Player } from './features/types'

const ThemeContext = React.createContext({
    loggedin: false,
    players: [] as Player[],
    self: {} as Player,
    onHandleDeath:() => {},
    onHandleReady: () => {},
    onHandleReplay: () => {},
    onEndedGame: () => {},
});
 
export default ThemeContext;