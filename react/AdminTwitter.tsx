import React, { FC, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { Layout, PageBlock, PageHeader, Input, Button, Spinner } from 'vtex.styleguide'
import saveTokenGQL from './graphql/saveToken.gql'
import getTokenGQL from './graphql/getToken.gql'

const AdminTwitter: FC = () => {
  const [token, setToken] = useState('')
  const [isLoading, setLoading] = useState(true)
  
  useQuery(getTokenGQL, { onCompleted: ({ token }) => {
    setToken(token)
    setLoading(false)
  }})

  const [saveToken] = useMutation(saveTokenGQL, {
    onCompleted: () =>
      setLoading(false)
  })

  return (
    <Layout
      pageHeader={
        <PageHeader
          title="Twitter Integration Setup"
        />
      }
    >
      <PageBlock variation="full">

        {isLoading &&
          <span className="dib c-muted-1">
            <Spinner /><br /><br />
          </span>
        }

        <h5>Twitter API Token</h5>

        <Input
          placeholder="API Token"
          value={token}
          onChange={(e: any) => setToken(e.target.value)}
        />

        <br />

        <Button
          onClick={() => {
            setLoading(true)
            saveToken({ variables: { token } })
          }}
        >
          Save
        </Button>
      </PageBlock>
    </Layout>
  )
}

export default AdminTwitter
