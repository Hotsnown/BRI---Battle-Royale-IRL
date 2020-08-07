import React from 'react';
import { Player, Position, Game } from './features/types'

const ThemeContext = React.createContext({
    loggedin: false,
    game: {} as Game,
    self: {} as Player,
    onHandleDeath:() => {},
    onHandleReplay: () => {},
    onHandleEnd: () => {},
    onHandleSubmitPlayerPosition: (coords: Position) => {},
    onHandleStart: () => {},
});
 
export default ThemeContext;