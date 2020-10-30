import { InputNumber, Card, Space, Divider, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useRouteMatch } from 'react-router-dom'
import { db, firebase } from '../firebase'
import './teamAssessment.css'

import assessmentsJSON from '../../constants/assessment.json'

const { Title, Paragraph, Text } = Typography

const teamDummy = {
	teamName: 'HACKERMANS',
	teamId: 1,
	members: [
		{
			id: 1,
			name: 'John Doe',
			email: 'JohnDoe@gmail.com',
		},
		{
			id: 2,
			name: 'John Doe',
			email: 'JohnDoe@gmail.com',
		},
		{
			id: 3,
			name: 'John Doe',
			email: 'JohnDoe@gmail.com',
		},
		{
			id: 4,
			name: 'John Doe',
			email: 'JohnDoe@gmail.com',
		},
	],
}

export default function TeamAssessment({ jury }) {
	const { phase, teamId } = useParams()
	const assessment = assessmentsJSON[phase]
	const evaluations = assessment.evaluation

	const [evals, setEvals] = useState({})
	const [isSubmitted, setIsSubmitted] = useState(false)

	useEffect(() => {
		// fetch team from db
		// console.log('[DEBUG] teamId: ', teamId)
		// console.log('[DEBUG] phase: ', phase)
		// console.log('[DEBUG] assessment: ', assessment)
		// console.log('[DEBUG] evals: ', evals)
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

		db.collection('marks').doc(teamId).add({
			score,
			jury_Name: jury.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})

		setEvals({})
		setIsSubmitted(true)
	}

	return isSubmitted ? (
		<Redirect to={`/phases/${phase}`} />
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
								Team number: <Text>{teamDummy?.teamId}</Text>
							</div>
							<div>
								Team name: <Text>{teamDummy?.teamName}</Text>
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
