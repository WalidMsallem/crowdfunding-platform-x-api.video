import React from 'react'
import NavBar from './NavBar'

type LayoutProps = {
  children?: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="main-layout__content page-wrapper">{children}</div>
    </div>
  )
}

export default Layout
