/**
 * projects services
 */

/* eslint-disable no-throw-literal */
import axios from 'axios'
import { requestHeader } from '../../utils/requestHeader'
import URL from '../constants/services.constants'
import { createProjectPayload } from '../types/projects.types'

export const createProject = async (
  body: createProjectPayload,
): Promise<any> => {
  const result = await axios.post(
    URL.baseApiUrl() + URL.projects.create,
    body,
    requestHeader({}),
  )
  return result.data
}
export const getProjects = async (query: string): Promise<any> => {
  const result = await axios.get(
    URL.baseApiUrl() + URL.projects.getProjects(query),
    requestHeader({}),
  )
  return result.data
}

export const genrateUploadToken = async (token: string): Promise<any> => {
  const result = await axios.post(
    URL.baseApiUrl() + URL.projects.genrateUploadToken,
    {},
    requestHeader({}, token),
  )
  return result.data
}

export const getUploadTokensList = async (
  token: string,
  query: string,
): Promise<any> => {
  const result = await axios.get(
    URL.baseApiUrl() + URL.projects.getUploadTokensList(query),
    requestHeader({}, token),
  )
  return result.data
}
