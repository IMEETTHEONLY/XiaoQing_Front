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
import Post from "../utils/Post";
import { get_post_page } from "@/assets/js/post";
import { onMounted } from "vue";
import { ref } from "vue";

export default {
  //注册子组件
  name: "PostList", //组件名称,导入其他组件的时候用
  components: {
    PostCompotent,
  },

  setup() {
    //定义一个posts数组来保存帖子数据
    const posts = ref([]);

    //设置一个钩子函数，当组件被挂载时执行
    onMounted(async () => {
      //调用post列表接口
      const get_post_pageList = await get_post_page(1, 2);
      console.log(get_post_pageList);

      // 假设后端返回的数据格式是 { data: [post1, post2, ...] }
      // 其中每个 post 对象都有 id, content, create_user, create_time, update_time 属性

      const postDataArray = get_post_pageList.data.rows;
      console.log(postDataArray);

      // 使用 .map() 方法遍历返回的数据数组，为每个元素创建一个新的 Post 实例
      // 并将这些实例添加到 posts 数组中
      posts.value = postDataArray.map((postData) => {
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

    return { posts };
  },
};
</script>

<style></style>
