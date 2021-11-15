/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getProjects } from '../../features/actions/projects.actions'
import {
  selectprojectsList,
  selectProjectLocalData,
} from '../../features/selectors/projects.selectors'
import { selectAuthInfo } from '../../features/selectors/auth.selectors'
import { useSelector, useDispatch } from 'react-redux'
import { Tag, Image, Card, Modal, Skeleton } from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { Meta } = Card

type Element = {
  title: string
  description: string
  tags: []
  assets: {
    thumbnail: string
    iframe: string
  }
}
type ProjectItemProps = {
  element: Element
}
export const hideLongText = (text: string, maxLength = 70) => {
  if (text.length > maxLength) {
    return <>{`${text.slice(0, maxLength)}...`}</>
  }
  return text
}

const CardSkeleton = () => {
  return (
    <ProjectItemStyled>
      <Card
        style={{ width: '100%' }}
        cover={<Skeleton.Image style={{ height: '150px' }} />}
        actions={[
          <SettingOutlined key="setting" disabled />,
          <EditOutlined key="edit" disabled />,
          <EllipsisOutlined key="ellipsis" disabled />,
        ]}
      >
        <Meta
          title={<Skeleton.Input style={{ width: 150 }} active size="small" />}
          description={
            <>
              <Skeleton.Input style={{ width: 200 }} active size="small" />
            </>
          }
        />
      </Card>
    </ProjectItemStyled>
  )
}
const ProjectItem = ({ element }: ProjectItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const projectDetails = (showAllDescription? :boolean) => {
    return (
      <div className="card-details">
        <div className="card-tags">
          {element.tags.map((tag, index) => {
            return <Tag key={index}>{tag} </Tag>
          })}
        </div>
        <div>
          {showAllDescription
            ? element.description
            : hideLongText(element.description)}
        </div>
      </div>
    )
  }
  return (
    <ProjectItemStyled>
      <Card
        style={{ width: '100%' }}
        cover={
          <Image
            height={200}
            src={element.assets.thumbnail}
            alt={`thumbnail ${element.title} `}
            preview={false}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => setIsModalVisible(true)}
          />,
        ]}
      >
        <Meta title={element.title} description={projectDetails(false)} />
      </Card>

      <Modal
        title={element.title}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        centered
        footer={false}
        width={1000}
        closable
        destroyOnClose={true}
      >
        <div
          className="iframe-container"
          dangerouslySetInnerHTML={{ __html: element.assets.iframe }}
        ></div>
        {projectDetails(true)}
      </Modal>
    </ProjectItemStyled>
  )
}
const ProjectsList = () => {
  const dispatch = useDispatch()

  const projectsLocalVariable: any = useSelector(selectProjectLocalData)
  const authInfo: any = useSelector(selectAuthInfo)
  const projects: any = useSelector(selectprojectsList)

  const { loading } = projectsLocalVariable

  useEffect(() => {
    const query = ''
    if (authInfo.access_token) {
      dispatch(getProjects(query))
    }
  }, [authInfo])
  const { data } = projects

  const loadingArray = new Array(6).fill(0)

  const renderContent = () => {
    if (loading.getProjects) {
      return loadingArray.map(() => <CardSkeleton />)
    } else {
      return data.map((el: Element, index: number) => (
        <ProjectItem key={index} element={el} />
      ))
    }
  }
  return <ProjectsListStyled>{renderContent()}</ProjectsListStyled>
}

const ProjectsListStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  background-color: #f1f1f1;
`
const ProjectItemStyled = styled.div`
  margin: 10px;
  flex-basis: 23%;
  margin-top: 10px;
  padding: 30px 5px;
  .card-tags {
    margin: 10px 5px;
  }
  .ant-skeleton-element,
  .ant-skeleton-image {
    width: 100% !important;
  }
`

export default ProjectsList
