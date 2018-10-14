import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Fade from '@material-ui/core/Fade/Fade'
import withStyles from '@material-ui/core/styles/withStyles'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'
import { firestore } from 'firebase/app'
import React, { Component, Fragment } from 'react'
import { POSTS_AS_THREAD } from '../constants/collection'
import { DESC } from '../constants/order'
import ThreadExpansionPanel from '../containers/ThreadExpansionPanel'
import { createdAt } from '../libs/createdAt'

class PageThreads extends Component<any, any> {
  isUnmounted = false

  state = {
    posts: [],
    inProgress: true,
    orderBy: 'createdAt'
  }

  render() {
    const { classes } = this.props
    const { posts, inProgress } = this.state

    return (
      <Fragment>
        <Tabs
          value={this.state.orderBy}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.onChangeTab}
        >
          <Tab label="新着" value={'createdAt'} />
          <Tab label="更新" value={'updatedAt'} />
          <Tab label="書き込み数" value={'replyPostCount'} />
        </Tabs>
        {inProgress && <CircularProgress className={classes.progress} />}
        {!inProgress && (
          <Fade in>
            <div className={classes.posts}>
              {posts.map(post => (
                <ThreadExpansionPanel key={post.id} post={post} />
              ))}
            </div>
          </Fade>
        )}
      </Fragment>
    )
  }

  onChangeTab = (event, orderBy) => {
    this.setState({ orderBy, inProgress: true })
    this.updatePosts(orderBy)
  }

  updatePosts(orderBy: string) {
    firestore()
      .collection(POSTS_AS_THREAD)
      .limit(100)
      .orderBy(orderBy, DESC)
      .get()
      .then(querySnapshot => {
        const posts = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            ...data,
            ui: {
              createdAt: createdAt(data.createdAt.seconds)
            }
          }
        })
        if (this.isUnmounted) return
        this.setState({ posts, inProgress: false })
      })
  }

  componentDidMount() {
    const { orderBy } = this.state

    this.updatePosts(orderBy)
  }

  componentWillUnmount() {
    this.isUnmounted = true
  }
}

const styles = () => ({
  root: {},
  progress: {
    display: 'block',
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default withStyles(styles)(PageThreads)