import { InputNumber, Card, Space, Divider, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useRouteMatch } from 'react-router-dom'
import { db, firebase } from '../firebase'
import './teamAssessment.css'

import assessmentsJSON from '../../constants/assessment.json'

const { Title, Paragraph, Text } = Typography

export default function TeamAssessment({ jury, juryName }) {
	const { phase, teamId } = useParams()
	const assessment = assessmentsJSON[phase]
	const evaluations = assessment.evaluation

	const [team, setTeam] = useState({})
	const [evals, setEvals] = useState({})
	const [isSubmitted, setIsSubmitted] = useState(false)

	const setTeamDetails = async () => {
		const team = await db.collection('teams').doc(teamId).get()
		console.log(team)

		if (!team.exists) {
			alert('Team not found')
			console.log('Team not found')
		} else {
			console.log('Team data:', team.data())

			setTeam(team.data())
		}
	}

	useEffect(() => {
		setTeamDetails()
	}, [])

	const evalScores = () => {
		let score = 0.0

		assessment.evaluation.forEach(evalObj => {
			if (!evals[evalObj.id] && evals[evalObj.id] !== 0) {
				alert('Enter your rating for every input')
				return
			}

			score += parseFloat(evalObj.weight) * evals[evalObj.id]
		})

		db.collection('marks').add({
			group: team.group,
			juryName: juryName,
			juryNumber: jury.phoneNumber,
			phase: phase,
			score,
			teamId: teamId,
		})

		setEvals({})
		setIsSubmitted(true)
	}

	return isSubmitted ? (
		//<Redirect to={`/phases/${phase}`} />
		<Redirect to={`/`} />
	) : (
		<div className='assessmentWrapper'>
			<Card>
				<div>
					<Typography>
						<Title>
							<Text>{assessment.title}</Text>
						</Title>
					</Typography>
					<Divider />
					<Typography>
						<Title
							level={4}
							style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
							<div>
								Team number: <Text>{teamId}</Text>
							</div>
							<div>
								Team name: <Text>{team?.name}</Text>
							</div>
						</Title>

						<Divider />
					</Typography>
					<Title level={4} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
						<Text>Assessment parameters</Text>
						<Text> 0-low, 10-max</Text>
					</Title>
					{evaluations.map(param => (
						<div
							key={param.id}
							style={{
								display: 'grid',
								gridTemplateColumns: '2fr 1fr',
								alignItems: 'center',
							}}>
							<Typography>
								<Title level={5}>
									<Text style={{ marginRight: 5 }}>{param.id}.</Text>
									{param.title}
								</Title>
							</Typography>
							<div style={{ margin: 20, marginLeft: 50 }}>
								<InputNumber
									min={0}
									max={10}
									value={evals[param.id]}
									suffix='.out of 10'
									onChange={value =>
										setEvals(evals => ({ ...evals, [param.id]: value }))
									}
								/>
							</div>
						</div>
					))}
					<div>
						<Button onClick={evalScores} type='primary'>
							Submit
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
