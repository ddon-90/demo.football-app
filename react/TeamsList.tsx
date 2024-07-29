import React, { FC } from 'react'
import { useQuery } from 'react-apollo'
import getAllTeams from './graphql/getAllTeams.gql'
import styles from './TeamsList.css'

interface Props {
  title: string
  numberOfTeams: number
}

interface Team {
  name: string,
  image_path: string
}

const TeamsList = ({ title = 'Football Teams', numberOfTeams = 5 }: Props) => {
  const { data, loading, error } = useQuery<{ getAllTeams: Team[] }>(getAllTeams, { variables: { numberOfTeams } })

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (error) {
    return <h4>Error on data fetching</h4>
  }

  const teams = data?.getAllTeams ?? [];

  return (
    <div className="w-80-ns w-90 mv-2 db center mt7 mw9">
      <h2 className="tc">{title}</h2>
      <div className={`db flex-ns `+`${styles.teamsContainer}`}>
        <div className={`dn flex-ns `+`${styles.locationContainer}`}>
          <p className={`tc f1 `+`${styles.location}`}>Football Teams</p>
        </div>
        <div className={`db dn-m `+`${styles.locationContainerMobile}`}>
          <p className={`tc f2 `+`${styles.location}`}>Football Teams</p>
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
    numberOfTeams: {
      title: 'Number of Teams',
      description: 'Number of Teams to display inside the block',
      type: 'number',
      default: '5',
    },
  },
}

export default TeamsList
