import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import getAllTeams from './graphql/getAllTeams.gql'
import styles from './TeamsList.css'

interface Props {
  title: string
  backgroundColor: string
  numberOfTeams: number
}

interface Team {
  name: string,
  image_path: string
}

const TeamsList = ({ title = 'Football Teams', backgroundColor = backgroundColors.BLUE, numberOfTeams = 5 }: Props) => {
  const { data, loading, error } = useQuery<{ teams: Team[] }>(getAllTeams, { variables: { numberOfTeams } })

  if (loading) {
    return (
      <div className="w-80-ns w-90 mv-2 db center mt7 mb7 mw9 tc">
        <h4>Loading...</h4>
      </div>
    )
  }
  if (error) {
    return (
      <div className="w-80-ns w-90 mv-2 db center mt7 mb7 mw9 tc">
        <h4>Error on data fetching</h4>
      </div>
    )
  }

  const teams = data?.teams ?? [];

  return (
    <div className="mv-2 db center mt7 mb7" style={{ maxWidth: "1528px" }}>
      <div className={`db flex-ns `+`${styles.teamsContainer}`}>
        <div className={`dn flex-ns `+`${styles.locationContainer}`} style={{ backgroundColor: backgroundColor }}>
          <p className={`tc f1 `+`${styles.location}`}>{title}</p>
        </div>
        <ul className={`${styles.teams}`}>
          {teams.map((team: Team, index: number) => (
            <li key={index}>
              <span className={`${styles.userName}`}>
                {team.name}
              </span>
              <img src={team.image_path} alt={team.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}

export const backgroundColors = {
  BLUE: '#03054e',
  ORANGE: '#ff7e21',
  GREEN: '#37682a',
}

TeamsList.schema = {
  title: 'editor.football.title',
  description: 'editor.football.description',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      description: 'This is the title of the Football Block',
      type: 'string',
      default: 'Title',
    },
    backgroundColor: {
      title: 'editor.property.background-color.title',
      description: 'editor.property.background-color.description',
      type: 'string',
      enum: Object.values(backgroundColors),
      enumNames: Object.keys(backgroundColors),
      default: backgroundColors.BLUE,
    },
    numberOfTeams: {
      title: "editor.property.number-of-teams.title",
      description: "editor.property.number-of-teams.description",
      type: 'number',
      default: '5',
    },
  },
}

export default TeamsList
