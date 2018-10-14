import withStyles from '@material-ui/core/styles/withStyles'
import Photo from '@material-ui/icons/Photo'
import React, { Component } from 'react'
import UnderDevelopment from '../components/UnderDevelopment'

class PageImages extends Component<any, any> {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <UnderDevelopment
          Icon={Photo}
          title={'フォト'}
          description={'画像付きの書き込みを検索する機能を開発しています。'}
        />
      </div>
    )
  }
}

const styles = () => ({
  root: {
    paddingTop: '40%'
  }
})

export default withStyles(styles)(PageImages)
