import { InputNumber, Card, Space, Divider, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

export default function TeamAssessment() {
	const { phase, teamId } = useParams()
	const assessment = assessmentsJSON[phase]
	const evaluations = assessment.evaluation

	const [evals, setEvals] = useState({})

	useEffect(() => {
		// fetch team from db
		// console.log('[DEBUG] teamId: ', teamId)
		// console.log('[DEBUG] phase: ', phase)
		// console.log('[DEBUG] assessment: ', assessment)
		// console.log('[DEBUG] evals: ', evals)
	}, [])

	const getScores = () => {
		let score = 0.0

		assessment.evaluation.forEach(evalObj => {
			if (!evals[evalObj.id]) {
				alert('Enter your rating for every input')
			}

			score += parseFloat(evalObj.weight) * evals[evalObj.id]
		})

		console.log(score)
	}

	return (
		<div className='assessmentWrapper'>
			<Card>
				<div style={{ padding: 20, width: '100%' }}>
					<Typography>
						<Title>
							<div>
								<Text keyboard>{assessment.title}</Text>
							</div>
						</Title>
					</Typography>
					<Divider />
					<Typography>
						<Title level={4}>
							<div>
								Team name: <Text keyboard>{teamDummy?.teamName}</Text>
							</div>
						</Title>
						<Title level={5}>
							<div>
								Team number: <Text code>{teamDummy?.teamId}</Text>
							</div>
						</Title>
						<Divider />
						<div>
							<Title level={3}>Members</Title>
							{teamDummy?.members.map((member, index) => (
								<Typography key={index}>
									<Paragraph>
										<Space>
											<Text strong>member {member.id}:</Text>
											<Text>name: </Text>
											<Text code>{member.name} </Text> <Text>email: </Text>
											<Text code>{member.email}</Text>
										</Space>
									</Paragraph>
								</Typography>
							))}
						</div>
						<Divider />
					</Typography>
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
								<Text> out of 10</Text>
							</div>
						</div>
					))}
					<div>
						<Button onClick={getScores} type='primary'>
							Submit
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
