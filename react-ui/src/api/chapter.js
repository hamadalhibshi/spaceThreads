import axios from './index';

const baseURL = '';

class ChapterApi {
  static getChapter = (data) => axios.get(`${baseURL}/listStories/`, data);

  static createChapter = (data) => axios.post(`${baseURL}/createChapter/`, data);


}

export default ChapterApi;