import { createContext, useContext } from 'react'

export const PlayerContext = createContext({
	isPlaying: false,
	track: null,
})

export const usePlayer = () => useContext(PlayerContext)
