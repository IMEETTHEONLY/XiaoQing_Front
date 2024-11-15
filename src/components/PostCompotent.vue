<template>
  <div id="app">
    <!-- 使用 :key 绑定语法，并且确保 post 对象有 id 属性 -->
    <p v-for="post in posts" :key="post.id">{{ post.content }}</p>
    <p>666</p>
  </div>
</template>

<script>
// 导入 Post 类（确保 Post 类已经正确导出，并且构造函数接受相应的参数）
import Post from "../utils/Post";
// import axios from "axios";

export default {
  data() {
    return {
      // 定义一个空的 posts 数组来存储 Post 实例
      posts: [],
    };
  },
  mounted() {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiemhhbmdzYW4ifSwiZXhwIjoxNzMxNjI2OTQ3fQ.xyf1yS5wf0Y_vTp6JBIzUlOVm4uZCvCsw2_WTQFGzhI";
    // 使用 axios 发送 GET 请求获取帖子数据
    fetch("http://localhost:8080/post/get", {
      method: "GET",
      params: { page: 1, page_size: 2, name: 2 },
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => {
        // 假设后端返回的数据格式是 { data: [post1, post2, ...] }
        // 其中每个 post 对象都有 id, content, create_user, create_time, update_time 属性
        const postDataArray = response.data; // 根据实际情况调整，可能是 response.data.posts 或其他

        // 使用 .map() 方法遍历返回的数据数组，为每个元素创建一个新的 Post 实例
        // 并将这些实例添加到 posts 数组中
        this.posts = postDataArray.map((postData) => {
          // 确保 Post 类的构造函数接受以下参数：id, content, create_user, create_time, update_time
          return new Post(
            postData.id,
            postData.content,
            postData.create_user,
            postData.create_time,
            postData.update_time
          );
        });
      })
      .catch((error) => {
        // 处理请求错误，例如显示错误消息给用户
        console.error("Error fetching posts:", error);
      });
  },
};
</script>

<style scoped>
/* 您的样式代码 */
</style>
