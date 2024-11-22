<template>
  <!-- 帖子组件，展示帖子详情、用户信息和评论 -->
  <div class="post-container">
    <!-- 用户信息区域 -->
    <div class="user-info">
      <img :src="create_user.avatar" alt="用户头像" class="avatar" />
      <p class="user-name">{{ create_user.name }}</p>
    </div>

    <!-- 帖子内容区域 -->
    <div class="post-content-wrapper"></div>
    <p>{{ postParent.content }}</p>

    <!-- 评论区域 -->
    <div class="comments-section">
      <h3>评论</h3>
      <ul>
        <li v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-content">
            <CommentCompotent :comment="comment"></CommentCompotent>
          </div>
        </li>
      </ul>

      <!-- 添加评论按钮 -->
      <div>
        <button
          class="view-button"
          @click="comment_post_status = !comment_post_status"
        >
          点我可以评论
        </button>
      </div>
      <div v-if="comment_post_status">
        <input
          type="text"
          v-model="commentContent"
          placeholder="请输入评论内容"
        />
        <button @click="addComment">添加评论</button>
        <button>点赞</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/post.css"></style>

<script>
import CommentCompotent from "./CommentCompotent.vue";
import { onMounted, ref } from "vue";
import { add_comment, get_commment_by_post_id } from "../assets/js/comment.js";
import { get_user } from "@/assets/js/user.js";

export default {
  props: {
    postParent: {
      type: Object,
      required: true,
    },
  },
  //注册子组件
  name: "PostCompotent", //被父组件引用时的名字
  components: {
    CommentCompotent,
  },
  setup(props) {
    //ref初始化的时候一定要根据数据类型赋予初值

    const commentContent = ref("");
    //
    const comment_post_status = ref(false);
    //存取评论列表
    const comments = ref([]);
    //存取发布帖子用户信息的常量
    const create_user = ref({});
    //这里是用来执行回复按钮的v-if操作的
    const reply_button_status = ref(false);

    //钩子函数
    onMounted(async () => {
      //获取帖子作者信息
      const create_user_res = await get_user(props.postParent.create_user);
      if (create_user_res.code == 0) {
        console.log("获取用户信息成功");
        create_user.value = create_user_res.data;
        console.log(create_user.value);
      }

      //这里的分页查询要做分页条的
      const All_comment_inPost = await get_commment_by_post_id(
        props.postParent.id,
        10,
        1
      );
      //判断是否获取到所有的评论列表
      if (All_comment_inPost.code == 0) {
        console.log("获取评论列表成功");
      }
      //将获取的值赋予给commens
      comments.value = All_comment_inPost.data.rows;
    });
    //注册一个添加评论的事件
    const addComment = async () => {
      //调用add_comment用axios向后端发起添加请求
      const res = await add_comment(
        commentContent.value,
        null,
        props.postParent.id
      );
      if (res.code === 0) {
        console.log("评论成功");
      }

      //在这里重新获取每条帖子下面的评论
      const postId = props.postParent.id;
      //调用封装好的函数获取帖子下面的评论,一定要加上await先获取到了数据之后再赋值
      const flush_comment = await get_commment_by_post_id(postId, 10, 1);
      //动态的将结果刷新给comments展示出来
      console.log(flush_comment);
      comments.value = flush_comment.data.rows;
      //将输入框的值刷新
      commentContent.value = "";
      //隐藏评论
      comment_post_status.value = false;
      console.log(commentContent.value);
    };

    return {
      commentContent,
      addComment,
      comments,
      comment_post_status,
      create_user,
      reply_button_status,
    };
  },
};
</script>
