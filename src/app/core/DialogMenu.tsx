import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import Email from '@material-ui/icons/Email'
import Equalizer from '@material-ui/icons/Equalizer'
import Home from '@material-ui/icons/Home'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import PriorityHigh from '@material-ui/icons/PriorityHigh'
import Update from '@material-ui/icons/Update'
import VpnKey from '@material-ui/icons/VpnKey'
import { AuthContext } from 'app/shared/contexts/authContext'
import { auth } from 'firebase/app'
import React, { FunctionComponent, useContext } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  onClose: any
  isOpen: boolean
}

const DialogMenu: FunctionComponent<Props> = ({ onClose, isOpen }) => {
  const authContext = useContext(AuthContext)
  const onSignOut = () => {
    auth()
      .signOut()
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DialogActions>
        <Button onClick={onClose} aria-label={'Close this menu'}>
          {'CLOSE'}
        </Button>
      </DialogActions>
      <DialogContent>
        <List>
          <Link to={'/'}>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText inset primary={'ホーム'} />
            </ListItem>
          </Link>
          <Link to={'/stats'}>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <Equalizer />
              </ListItemIcon>
              <ListItemText inset primary={'統計'} />
            </ListItem>
          </Link>
          <Link to={'/changelogs'}>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <Update />
              </ListItemIcon>
              <ListItemText inset primary={'アップデート'} />
            </ListItem>
          </Link>
          <Link to={'/policy'}>
            <ListItem button onClick={onClose}>
              <ListItemIcon>
                <PriorityHigh />
              </ListItemIcon>
              <ListItemText inset primary={'プライバシーポリシー'} />
            </ListItem>
          </Link>
        </List>
        {authContext.isLogged && (
          <List subheader={<ListSubheader>{'アカウント'}</ListSubheader>}>
            <Link to={'/settings/email'}>
              <ListItem button onClick={onClose}>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText inset primary={'メールアドレスの更新'} />
              </ListItem>
            </Link>
            <Link to={'/settings/password'}>
              <ListItem button onClick={onClose}>
                <ListItemIcon>
                  <VpnKey />
                </ListItemIcon>
                <ListItemText inset primary={'パスワードの更新'} />
              </ListItem>
            </Link>
            <ListItem button onClick={onSignOut}>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText inset primary={'ログアウト'} />
            </ListItem>
          </List>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogMenu