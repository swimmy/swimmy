import withStyles from '@material-ui/core/styles/withStyles'
import VpnKey from '@material-ui/icons/VpnKey'
import React, { Component } from 'react'
import UnderDevelopment from '../components/UnderDevelopment'

class PageSettingsPassword extends Component<any, any> {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <UnderDevelopment
          Icon={VpnKey}
          title={'パスワードの更新'}
          description={'パスワードを更新する機能を開発しています。'}
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

export default withStyles(styles)(PageSettingsPassword)