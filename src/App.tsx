/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss'

import React, { useEffect } from 'react'
import Layout from './components/Layout'
import ProjectList from './components/ProjectsList'
import CreateProject from './components/CreateProject'
import HeadLine from './components/HeadLine'
import { Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthLocalData } from './features/selectors/auth.selectors'
import { selectProjectLocalData } from './features/selectors/projects.selectors'
import { authenticate } from './features/actions/auth.actions'

const App = (): JSX.Element => {
  const dispatch = useDispatch()
  const authLocalData: any = useSelector(selectAuthLocalData)
  const projectLocalData: any = useSelector(selectProjectLocalData)

  const { loading: authLoading } = authLocalData
  const { loading: projectsLoading } = projectLocalData

  useEffect(() => {
    dispatch(authenticate())
  }, [])

  return (
    <Spin
      size="large"
      spinning={
        authLoading.fetchToken ||
        projectsLoading.genrateUploadToken ||
        projectsLoading.getUploadTokens
      }
    >
      <Layout>
        <HeadLine />
        <CreateProject />
        <ProjectList />
      </Layout>
    </Spin>
  )
}

export default App
