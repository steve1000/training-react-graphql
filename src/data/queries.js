import gql from 'graphql-tag'

export const TWITTER_FEED_QUERY = gql`
    query allTweets {
        allTweets(
            orderBy: createdAt_DESC
            first: 10
        ) {
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
`

export const TWEET_QUERY = gql`
    query tweet($id: ID!) {
        Tweet(id: $id) {
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
`