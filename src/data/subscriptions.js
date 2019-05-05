import gql from 'graphql-tag'
// ref: https://www.graph.cool/docs/reference/graphql-api/subscription-api-aip7oojeiv
export const NEW_TWEET_SUBSCRIPTION = gql`
    subscription newTweets {
        Tweet(
            filter: {
                mutation_in: [CREATED]
            }
        ) {
            mutation
            node {
                id
                message
                author
                createdAt
                hashtags {
                    id
                    tag
                }
            }
        }
    }
  
`