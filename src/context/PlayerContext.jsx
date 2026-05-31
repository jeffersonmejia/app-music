import { createContext, useContext } from 'react'

export const PlayerContext = createContext({
	isPlaying: false,
})

export const usePlayer = () => useContext(PlayerContext)
