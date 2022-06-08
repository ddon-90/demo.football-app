export const search = async (_: any, { searchTerm }: { searchTerm: string }, { clients: { twitter, vbase } }: Context) => {
  const { token }  = await vbase.getJSON<{ token: string }>('configs', 'token')
  return await twitter.search(token, searchTerm)
}
