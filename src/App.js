import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import Login from './components/login/Login'
import Phases from './components/phases/Phases'
import { db, auth } from './components/firebase'
import HeaderLogos from './components/HeaderLogos'
import TeamAssessment from './components/TeamAssessment'
import './App.css'
import InputTeam from './components/InputTeam'

const { Header, Content } = Layout

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
		<>
			<HeaderLogos />
			<Router>
				<Route exact path='/'>
					{/* {user ? <Phases /> : <Login />} */}
					{user ? <Phases /> : <Phases />}
				</Route>
				<Switch>
					<Route path='/phases/:phase'>
						{/* <InputTeam jury={user} /> */}
						<InputTeam jury={{ name: 'JOHN THE JURY' }} />
						<Route path='/phases/:phase/assessment/:teamId'>
							<TeamAssessment />
						</Route>
					</Route>
				</Switch>
			</Router>
		</>
	)
}

export default App
