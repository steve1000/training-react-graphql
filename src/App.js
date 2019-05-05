import React, { Component } from 'react'
import generateSillyName from 'sillyname'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import TwitterFeed from './TwitterFeed'

import './App.css'

// Paste your service ID here
const SERVICE_ID = ''

const httpLink = createHttpLink({ uri: `https://api.graph.cool/simple/v1/${SERVICE_ID}` })

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.ap-northeast-1.graph.cool/v1/${SERVICE_ID}`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

const TWITTER_USERNAME_KEY = 'TWITTER_USERNAME'

class App extends Component {

  state = {
    author: ''
  }

  componentDidMount() {
    // Extension: 1
    // Developers can create their own name input instead of a random one
    let author = localStorage.getItem(TWITTER_USERNAME_KEY)
    if (!author) {
      author = generateSillyName()
      console.log('No name in localStorage, generated new: ', author)
      localStorage.setItem(TWITTER_USERNAME_KEY, author)
    }
    console.log('Name in localStorage: ', author)
    this.setState({ author })

  }

  render() {
    if (SERVICE_ID === '') {
      return (
        <div>
          <p>Please enter the Graphcool service ID on line 15 of App.js</p>
          <p><code>Line 15 - const SERVICE_ID = ''</code></p>
        </div>
      )
    }
    const { author } = this.state
    return (
      <ApolloProvider client={client}>
        <TwitterFeed author={author} />
      </ApolloProvider>
    )
  }
}

export default App