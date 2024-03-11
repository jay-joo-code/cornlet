import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthCallback from 'src/pages/auth-callback'
import CookiePolicy from 'src/pages/cookie-policy'
import Edit from 'src/pages/edit'
import Env from 'src/pages/env'
import Home from 'src/pages/home'
import Listing from 'src/pages/listing'
import New from 'src/pages/new'
import PrivacyPolicy from 'src/pages/privacy-policy'
import Profile from 'src/pages/profile'
import MyBookmarks from 'src/pages/profile/MyBookmarks'
import Chat from 'src/pages/profile/MyChats/Chat'
import Chatroom from 'src/pages/profile/MyChats/Chatroom'
import MyListings from 'src/pages/profile/MyListings'
import Settings from 'src/pages/profile/Settings'
import Stats from 'src/pages/stats'
import TermsConditions from 'src/pages/terms-conditions'
import MainFooter from '../footers/MainFooter'
import PrivateRoute from './PrivateRoute'
import ResetUserStore from './ResetUserStore'
import ScrollToTop from './ScrollToTop'
import SocketIO from './SocketIO'

const AppRouter = () => {
  const user = useSelector((state) => state.user)
  const bannedEmails = [
    'lily.d.pieramici042402@gmail.com',
    'chiayuho2001@gmail.com',
    'rolpz289974@gmail.com',
    'chiayuho162001@gmail.com',
    'kmjeong130309574@gmail.com',
    'prgmayorga1470@gmail.com',
  ]

  if (
    process.env.NODE_ENV === 'production' &&
    user &&
    ((user.email && (bannedEmails.includes(user.email) || user.email.includes('chiayuho'))) ||
      user.isBanned)
  ) {
    return null
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/listing/:id/edit' component={Edit} />
        <Route exact path='/listing/:id' component={Listing} />
        <Route exact path='/stats' component={Stats} />
        <Route exact path='/env' component={Env} />
        <Route exact path='/new' component={New} />
        <Route exact path='/terms-conditions' component={TermsConditions} />
        <Route exact path='/privacy-policy' component={PrivacyPolicy} />
        <Route exact path='/cookie-policy' component={CookiePolicy} />
        <Route exact path='/auth/callback' component={AuthCallback} />
        <PrivateRoute exact path='/profile/settings' component={Settings} />
        <PrivateRoute exact path='/profile/chat/:cid' component={Chatroom} />
        <PrivateRoute exact path='/profile/bookmarks' component={MyBookmarks} />
        <PrivateRoute exact path='/profile/chat' component={Chat} />
        <PrivateRoute exact path='/profile/listings' component={MyListings} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <Route exact path='/' component={Home} />
      </Switch>
      <ResetUserStore />
      <ScrollToTop />
      <SocketIO />
      <MainFooter />
    </BrowserRouter>
  )
}

export default AppRouter
