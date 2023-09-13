import axios from "./index";

const baseURL = "";

class StoryApi {
  static createStory = (data) => axios.post(`${baseURL}/createStory/`, data);

  static getStory = (data) => axios.get(`${baseURL}/listStories/`, data);

  static getOneStory = (id) => axios.get(`${baseURL}/storyDetails/${id}`);

  static getUserData = (data) => axios.get(`${baseURL}/getUserData/`, data);

  static createComment = (data) => axios.post(`${baseURL}/createComment/`, data);
}

export default StoryApi;
