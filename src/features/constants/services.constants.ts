const URL = {
  baseApiUrl: () => 'https://sandbox.api.video',
  auth: {
    authenticate: '/auth/api-key',
    refreshToken: '/auth/refresh',
  },
  projects: {
    create: '/videos',
    getProjects: (query: string) => `/videos${query && ''}`,
    genrateUploadToken: '/upload-tokens',
    getUploadTokensList: (query: string) => `/upload-tokens${query && ''}`,
  },
}

export default URL
