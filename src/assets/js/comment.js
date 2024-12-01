import axios from "axios";

const BASE_URL = "http://localhost:8080/comment";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjEsInVzZXJuYW1lIjoibW94dWV5YW8ifSwiZXhwIjoxNzMyNDEwMjM1fQ.tVlgfB0iAJUK2WWBCQBttjfUmioUXNmhVSC4Q7M2U0g";
//添加帖子
export const add_comment = async (content, master_id, post_id) => {
  const res = await axios.post(
    //请求路径
    BASE_URL + "/add",
    //请求体
    { content: content, master_id: master_id, post_id: post_id },
    //请求头  请求头这里可以带上参数
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

//根据post_id获取评论
export const get_commment_by_post_id = async (post_id, page_size, page) => {
  const res = await axios.get(
    BASE_URL + "/get",
    //参数为queryString类型
    {
      params: { post_id: post_id, page_size: page_size, page: page },
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

//根据master_id获取获取子评论
export const get_child_comment_by_master_id = async (master_id) => {
  //在请求资源的同时等待
  const res = await axios.get(
    BASE_URL + "/getChildCom",
    //请求头 这里可以带上参数
    {
      params: { master_id: master_id },
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return res.data;
};

//调用后端的likes自增接口，将评论的id传递过去后点赞量会自增
export const add_like = async (id) => {
  //异步调用
  const res = await axios.post(
    //请求路径
    BASE_URL + "/like",
    //请求体为空
    null,
    {
      params: { id: id }, //参数为queryString类型
      headers: {
        "Content-Type": "querystring",
        Authorization: "Bearer " + token,
      },
    }
  );

  return res.data;
};

//根据id获取评论(这个操作是用来刷新展示的)
export const get_comment_by_id = async (id) => {
  const res = await axios.get(
    //请求路径
    BASE_URL + "/getComById",
    //请求头
    {
      params: { id: id },
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return res.data;
};
