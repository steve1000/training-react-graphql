import React, { Component } from 'react'
import { withApollo, graphql, compose } from 'react-apollo'
import { Container, Row, Col } from 'react-bootstrap'
import { TWITTER_FEED_QUERY } from './data/queries'
import { NEW_TWEET_SUBSCRIPTION } from './data/subscriptions'
import TweetForm from './components/TweetForm'
import TweetList from './components/TweetList'

class TwitterFeed extends Component {

    async componentDidMount() {
        // Extension: 5
        // Implement subscriptions
        this.props.tweets.subscribeToMore({
            document: NEW_TWEET_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newTweetItem = subscriptionData.data.Tweet.node;
                return {
                    ...prev,
                    allTweets: [newTweetItem, ...prev.allTweets]
                };
            }
        })
    }

    /* Extension: 4 */
    handleSubmitSuccess = async (success) => {
        // Use this before moving onto subscriptions
        // this.props.tweets.refetch()
    }

    refetchTweets = () => {
        this.props.tweets.refetch()
    }

    render() {
        const { author, tweets } = this.props
        return (
            <Container>
                <Row>
                    <Col md={5}>
                        <TweetForm
                            handleSubmitSuccess={this.handleSubmitSuccess}
                            author={author}
                        />
                        {/* Extension: 3
                            Implement some sort of button loading state when we refetch
                        */}
                        <button className="btn btn-secondary" onClick={this.refetchTweets}>Refetch</button>
                    </Col>
                    <Col md={7}>
                        <TweetList
                            loading={tweets.loading}
                            tweets={tweets.allTweets}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default compose(
    graphql(TWITTER_FEED_QUERY, {
        name: 'tweets'
    })
)(withApollo(TwitterFeed))