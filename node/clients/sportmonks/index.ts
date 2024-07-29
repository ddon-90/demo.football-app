import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import { Team } from '../../typings/team'

export class SportmonksClient extends ExternalClient {

  constructor (context: IOContext, options?: InstanceOptions) {
    super(
      'https://api.sportmonks.com',
      context,
      {
        ...(options ?? {}),
      }
    )
  }

  public getAllTeams = async (token: string, numberOfTeams: number): Promise<Team[]> => {
    const result = await this.http.get(`/v3/football/teams?per_page=${numberOfTeams || 10}`, {
      headers: {
        'Authorization': token,
      },
    });

    const teams = result.data;

    return teams.map((team: Team) => {
      return {
        name: team.name,
        image_path: team.image_path
      };
    });
  }
}
