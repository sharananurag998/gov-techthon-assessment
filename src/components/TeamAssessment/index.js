import { InputNumber, Card, Space, Divider, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './teamAssessment.css'

import assessmentsJSON from '../../constants/assessment.json'

const { Title, Paragraph, Text } = Typography

const assessmentDummy = {
	category: 'Requirement assessment',
	evaluation: [
		{
			id: 1,
			title: 'Is the problem statement properly understood ?',
			value: 0,
		},
		{ id: 2, title: 'Are all fuctionality understood ?', value: 0 },
		{ id: 3, title: 'Has the team come up with innovative features?', value: 0 },
		{ id: 4, title: 'Are the features / functionality feasible / practicle ?', value: 0 },
		{ id: 6, title: 'Others', value: 0 },
	],
}

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
	}, [])

	return (
		<div className='assessmentWrapper'>
			<Card>
				<div style={{ padding: 20, width: '100%' }}>
					<Typography>
						<Title>
							<div>
								Assessment - <Text keyboard>{assessment.title}</Text>
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
											<Text strong>member {member.id}:</Text>{' '}
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
									defaultValue={param.value}
									min={0}
									max={10}
									value={evals[param.id]}
									onChange={value =>
										setEvals(evals => ({ ...evals, [param.id]: value }))
									}
								/>
								<Text> out of 10</Text>
							</div>
						</div>
					))}
					<div>
						<Button onClick={e => console.log('team id: ', teamId)} type='primary'>
							Submit
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
