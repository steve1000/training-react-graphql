import gql from 'graphql-tag'

export const CREATE_TWEET_MUTATION = gql`
    mutation createTweet($message: String!, $author: String!) {
        createTweet(message: $message, author: $author) {
            id
        }
    }
`