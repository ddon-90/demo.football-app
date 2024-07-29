/*
declare var process: {
  env: {
    VTEX_APP_ID: string
  }
}

interface Settings {
  token: string
}
*/

export const getAllTeams = async (
  _: any, { numberOfTeams }: { numberOfTeams: number },
  { clients: { sportmonks, vbase } }: Context) => {
  
  // For the purpose of showing how to extend the VTEX Admin
  // I've created a page where you can get and set the token
  // in vbase. The best approach would be to use the app settings
  // as explained below. 
  // const appId: string = process.env.VTEX_APP_ID;
  // const settings = (await apps.getAppSettings(appId)) as Settings;
  // const { token }  = settings;
  
  // Get Auth Token from vbase
  const { token }  = await vbase.getJSON<{ token: string }>('configs', 'token');
  
  // Get all footbal teams
  const teams = await sportmonks.getAllTeams(token, numberOfTeams);
  
  return teams;
}
