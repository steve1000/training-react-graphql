import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { CREATE_TWEET_MUTATION } from '../data/mutations'

class TweetForm extends Component {

    state = {
        message: '',
        submitting: false
    }

    submit = async (event) => {
        event.preventDefault()
        this.setState({ submitting: true })
        const { message } = this.state
        const { createTweetMutation, author, handleSubmitSuccess } = this.props
        const createTweet = await createTweetMutation({
            variables: {
                message,
                author
            }
        })

        this.setState({ submitting: false })

        if (createTweet.data.createTweet.id) {
            this.setState({ message: '' })
            handleSubmitSuccess(true)
        }
    }

    render() {
        const { message, submitting } = this.state
        return (
            <form className="feed--form" onSubmit={this.submit}>
                <textarea
                    className="feed--form__message"
                    placeholder="Type your tweet here..."
                    value={message}
                    onChange={event => this.setState({ message: event.target.value })}
                    maxLength={140}
                />
                <button
                    className="btn btn-primary feed--form__submit"
                    type="submit"
                    disabled={!message}
                >
                    {submitting ? 'Submitting...' : 'Tweet!'}
                </button>
            </form>
        )
    }
}

export default compose(
    graphql(CREATE_TWEET_MUTATION, {
        name: 'createTweetMutation'
    })
)(TweetForm)