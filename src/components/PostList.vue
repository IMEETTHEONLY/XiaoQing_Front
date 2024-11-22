<template>
  <!-- 此组件是用来展示帖子列表 -->
  <!-- 通过v-for将post传递给子组件PostCompotent -->
  <ul v-for="post in posts" :key="post.id">
    <PostCompotent :postParent="post"></PostCompotent>
  </ul>
</template>

<script>
import PostCompotent from "./PostCompotent.vue";
// 导入 Post 类（确保 Post 类已经正确导出，并且构造函数接受相应的参数）
import axios from "axios";
import Post from "../utils/Post";
// import axios from "axios";
export default {
  //注册子组件
  name: "PostList", //组件名称,导入其他组件的时候用
  components: {
    PostCompotent,
  },
  data() {
    return {
      // 定义一个空的 posts 数组来存储 Post 实例
      posts: [],
    };
  },
  mounted() {
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiemhhbmdzYW4ifSwiZXhwIjoxNzMyMjgzMzc0fQ.K269jlhFXEV-TUFMW9EEX4ZhQXcTDSNgrsf5QZCluG8";
    // 使用 axios 发送 GET 请求获取帖子数据
    axios
      .get("http://localhost:8080/post/get", {
        params: { page: 1, page_size: 2 },
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        // 假设后端返回的数据格式是 { data: [post1, post2, ...] }
        // 其中每个 post 对象都有 id, content, create_user, create_time, update_time 属性

        const postDataArray = response.data.data.rows;
        console.log(postDataArray);

        // 使用 .map() 方法遍历返回的数据数组，为每个元素创建一个新的 Post 实例
        // 并将这些实例添加到 posts 数组中
        this.posts = postDataArray.map((postData) => {
          // 确保 Post 类的构造函数接受以下参数：id, content, create_user, create_time, update_time
          return new Post(
            postData.id,
            postData.content,
            postData.createUser,
            postData.createTime,
            postData.updateTime
          );
        });
      });

    //获取每条帖子的评论并展示
  },
};
</script>

<style></style>
