import axios from './index';

const baseURL = '';

class StoryApi {
  static createStory = (data) => axios.post(`${baseURL}/createStory/`, data);
}

export default StoryApi;