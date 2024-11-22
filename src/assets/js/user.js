//根据userid获取用户数据
import axios from "axios";
const BASE_URL = "http://localhost:8080/user";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiemhhbmdzYW4ifSwiZXhwIjoxNzMyMjgzMzc0fQ.K269jlhFXEV-TUFMW9EEX4ZhQXcTDSNgrsf5QZCluG8";

export const get_user = async (create_user) => {
  //异步调用get
  const res = await axios.get(
    //请求地址
    BASE_URL + "/getUserById" + "?id=" + create_user,

    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  //vue3的语法就是一定要返回
  return res.data;
};
