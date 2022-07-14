import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserStore from './store/UserStore'
import ClothesStore from './store/ClothesStore'

export const Context = createContext(null)

ReactDOM.render(
	<Context.Provider
		value={{
			user: new UserStore(),
			clothes: new ClothesStore(),
		}}
	>
		<App />
	</Context.Provider>,
	document.getElementById('root')
)
