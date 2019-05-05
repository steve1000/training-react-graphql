import React from 'react'

const TweetList = (props) => {
    if (props.loading) {
        return <div>Loading...</div>
    }
    if (!props.tweets.length) {
        return <div>No tweets found...</div>
    }
    // Extension: style this to more resemble a Twitter feed design
    return props.tweets.map(tweet => (
        <div className="tweet-list__tweet--container fadein" key={`tweet_${tweet.id}`}>
            <h5 className="tweet-list__tweet--author">{tweet.author}</h5>
            <span className="tweet-list__tweet--message">{tweet.message}</span>
        </div>
    ))
}

export default TweetList