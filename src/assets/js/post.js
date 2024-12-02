import axios from "axios";
import { useStore } from "vuex";
const BASE_URL = "http://localhost:8080/post";

//获取本地存储的token
// const localStorage = window.localStorage;
// const token = localStorage.getItem("jwt-token");
const store = useStore();
const token = store.state.token;

//导出变量
export const get_post_page = async (page, page_size, content) => {
  //这里的axios要有一个返回值作为回调
  const res = await axios.get(
    //请求地址
    BASE_URL + "/get",
    //请求头
    {
      params: {
        page: page,
        page_size: page_size,
        content: content,
      },
      //请求体
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};
