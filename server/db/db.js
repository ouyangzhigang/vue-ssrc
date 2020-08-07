const sha = require('sha1');
const axios = require('axios');

// 数据库名称
const className = 'todo';

const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})

const handleError = (code, resp) => {
  const err = new Error(resp.message);
  err.code = code;
  return err;
}

const handleRequest = ({status, data, ...rest}) => {
  if (status === 200) {
    return data;
  } else {
    throw handleError(status, rest)
  }
}

module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now();

    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }

  return {
    async getAllTodos () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    }
  }
}