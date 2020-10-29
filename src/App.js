import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'

import Login from './components/login/Login'
import Phases from './components/phases/Phases'
import { db, auth } from './components/firebase'
import HeaderLogos from './components/HeaderLogos'
import './App.css'

const { Header, Content, Footer } = Layout

function App() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
			if (authUser) {
				//user logged in
				console.log(authUser)
				setUser(authUser)
			} else {
				//user logged out
				setUser(null)
			}
		})

		return () => {
			//perform cleanup
			unsubscribe()
		}
	}, [user])

	return (
		<Layout>
			<Header>
				<HeaderLogos />
			</Header>
			<Content>
				<Router>
					<Route exact path='/'>
						{user ? <Phases /> : <Login />}
						{/* {user ? <Phases /> : <Phases />} */}
					</Route>
				</Router>
			</Content>
		</Layout>
	)
}

export default App
