import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Form, Input, Button, Select, Upload, Steps, Modal } from 'antd'
import {
  createProject,
  addVideoToProject,
  toggleModal,
} from '../../features/actions/projects.actions'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectProjectLocalData,
  selectCurrentProject,
} from '../../features/selectors/projects.selectors'
import { UploadOutlined } from '@ant-design/icons'
import { load as loadStorageItem } from '../../utils/storage'
import { VideoUploader } from '@api.video/video-uploader'

const { TextArea } = Input
const { Step } = Steps

const CreateProject = (): JSX.Element => {
  const [percent, setPercent] = useState(0)
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false)
  const [disableCloseModal, setDisableCloseModal] = useState(false)

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const projectsLocalVariable: any = useSelector(selectProjectLocalData)
  const currentProject: any = useSelector(selectCurrentProject)

  const { currentformStep, createProjectModal } = projectsLocalVariable
  const { videoId } = currentProject

  const onFinish = (values: any) => {
    dispatch(createProject(values))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleUpload = (req: object| any) => {
    const uploadToken = loadStorageItem('upload_token')
    const uploadInstance = new VideoUploader({
      file: req.file,
      uploadToken,
      chunkSize: 1024 * 1024 * 5,
      retries: 2,
      videoId: videoId,
      apiHost: 'sandbox.api.video',
    })

    uploadInstance.onProgress((event) => {
      setPercent(Math.round((event.uploadedBytes / event.totalBytes) * 100))
    })

    setDisableCloseModal(true)

    uploadInstance
      .upload()
      .then((video) => {
        dispatch(addVideoToProject(videoId, video))
        setTimeout(() => {
          dispatch(toggleModal(false))
        }, 3000)
        setDisableCloseModal(false)
        setUploadSuccessMsg(true)
        console.log(video)
      })
      .catch((error) => console.log(error.status, error.message))
  }

  const steps = [
    {
      title: 'Project MetaData',
      content: (
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <div className="form-description">
            Fill out this form with the title of your project, a short
            description and tags
          </div>
          <Form.Item
            label="title"
            name="title"
            rules={[{ required: true, message: 'Please input the title !' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="tags"
            name="tags" 
          >
            <Select mode="tags" placeholder="Please select"></Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Video',
      content: (
        <> 
          {uploadSuccessMsg ? (
            <h2>
              the video is uploaded successfully. your projects are now online
            </h2>
          ) : (
            <Upload
              // action={(a) => {
              //   console.log('jjjj 1', a)
              //   return ''
              // }}
              customRequest={(req: object ): void => {
                return handleUpload(req)
              }
              }
              progress={{
                strokeWidth: 2, 
                success: { 
                  percent: percent,
                }, 
                format: (per, successPercent) => {
                  return <div> {`${successPercent}/100`} </div>
                }, 
              }} 
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
        </>
      ),
    },
  ]
  const handleCloseModal = () => {
    if (!disableCloseModal) {
      dispatch(toggleModal(false))
    }
  }
  return (
    <CreateProjectStyled>
      <Modal
        title="Follow your cause"
        visible={createProjectModal}
        onCancel={handleCloseModal}
        centered
        footer={false}
        closable
        destroyOnClose={true}
      >
        <Steps current={currentformStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[currentformStep].content}</div>
        <div className="steps-action">
          {currentformStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                form.submit()
              }}
            >
              Next
            </Button>
          )}
        </div>
      </Modal>
    </CreateProjectStyled>
  )
}

const CreateProjectStyled = styled.div`
  width: 80%;
 
`

export default CreateProject
