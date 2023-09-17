import axios from "./index";

const baseURL = "";

class StoryApi {
  static createStory = (data) => axios.post(`${baseURL}/createStory/`, data);

  static getStory = (data) => axios.get(`${baseURL}/listStories/`, data);

  static getOneStory = (id) => axios.get(`${baseURL}/storyDetails/${id}`);

  static getTopRatedStories = (data) => axios.get(`${baseURL}/getTopRatedStories/`, data);

  static getUserData = (data) => axios.get(`${baseURL}/getUserData/`, data);

  static createComment = (data) => axios.post(`${baseURL}/createComment/`, data);

  static listComment = (data) => axios.get(`${baseURL}/listComments/`, data);

  static authorUserDetails = (data) => axios.get(`${baseURL}/authorUserDetails/`, data);

  static getStats = (data) => axios.get(`${baseURL}/getStats/`, data);
}

export default StoryApi;
