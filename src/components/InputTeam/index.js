import { Button, Input, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { Redirect, useParams, useRouteMatch } from 'react-router-dom'

import assessmentsJSON from '../../constants/assessment.json'

const { Title, Paragraph, Text } = Typography

export default function InputTeam({ jury }) {
	const [teamId, setTeamId] = useState()
	const [redirect, setRedirect] = useState()

	const { phase } = useParams()
	const { path, url } = useRouteMatch()

	const routeToTeamAssessment = () => {
		const route = `${url}/assessment/${teamId}`
		console.log(url)
		setRedirect(route)
	}

	return redirect ? (
		<Redirect to={redirect} />
	) : (
		<div
			style={{
				display: 'grid',
				placeItems: 'center',
				height: '100%',
				marginTop: '-100px',
			}}>
			<div>
				<Typography>
					<Title style={{ fontSize: 75 }}>Welcome {jury.name}</Title>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '2fr 1fr',
							columnGap: 15,
							placeItems: 'center',
						}}>
						<Paragraph style={{ fontSize: 25 }}>
							Enter Team ID to start evaluating on
							<Text strong>{assessmentsJSON[phase].title}</Text>
						</Paragraph>
						<Space>
							<Text strong>Team Id: </Text>
							<Input value={teamId} onChange={e => setTeamId(e.target.value)} />
							<Button onClick={routeToTeamAssessment}>Evaluate</Button>
						</Space>
					</div>
				</Typography>
			</div>
		</div>
	)
}
