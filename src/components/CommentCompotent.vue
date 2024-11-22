<template>
  <!-- 此组件是用来表示一个评论的最小单位的组件 -->
 

  <div class="comment-content">
    <!-- 展示评论内容 -->
    <p class="comment-text">
      {{ comment.content }}
      <ul>
        <li v-for="childComment in childComments" :key="childComment.id">
          {{ childComment.content }}
        </li>
      </ul>
    </p>
    <!-- 展示点赞量 -->
    <p class="comment-like">点赞量:{{likes}}</p>

    <!-- 点击展示评论输入框 -->
    <button
      class="reply-button"
      @click="reply_button_status = !reply_button_status"
    >
      点击我进行回复
    </button>

    <!-- //点一次。喜欢量增加一次 -->
    <button class="like-button" @click="add_likes">点赞</button>
    <!-- 根据reply_button_status的值来控制是否显示评论输入框 -->
    <div v-if="reply_button_status">
      <input
        type="text"
        v-model="commentContent"
        placeholder="请输入评论内容"
      />
      <button @click="return_msg">回复</button>
    </div>
  </div>
</template>

<script>
import { add_like, get_child_comment_by_master_id, get_comment_by_id ,add_comment} from "@/assets/js/comment";
import Comment from "@/utils/comment";
import { onMounted, ref } from "vue";
export default {
  props: {
    comment: Object,
  },

  setup(props) {
    //console.log(props.comment.content)
    //模拟数据comment
    // const testComment = ref(
    //   new Comment( 9,"评论内容", 1, 1, 9, 1, "2022-05-05", "2022-05-05")
    // );

    // 回复按钮的状态
    const reply_button_status = ref(false);

    //绑定评论输入框的内容
    const commentContent = ref("");

    //定义一个子评论，当对评论进行评论的时候加入进去，根据pmaster_id将所有子评论显示出来
    const childComments=ref([]);

    //定义点赞量
    const likes=ref(props.comment.likes)


    //钩子函数
  onMounted(async()=>{
    //在组件挂载的时候就将子评论从数据库读取出来放在子评论数组当中
    const child_comment_res=await get_child_comment_by_master_id(props.comment.id);
    //console.log(child_comment_res);
    if(child_comment_res.code==0){
      //将子评论数据放在数组当中
      childComments.value=child_comment_res.data;
    }
    
  })

    //点击回复按钮，将评论内容发送给后端，并刷新页面
    //async的作用是等待事件的触发才打印
    const return_msg = async () => {
      
      
      
     

      //构建子评论并加入数组
     const child_comment=new Comment(null,commentContent.value,1,props.comment.id,props.comment.post_id,0,new Date(),new Date );
     console.log(child_comment);

     //点击回复了调用接口传递给数据库
     const add_comment_res=await add_comment(child_comment.content,child_comment.master_id,props.comment.post_id);
     if(add_comment_res.code==0){
       console.log("评论成功");
     }

      
      //置空
      commentContent.value = "";


      //调用get_child_comment_by_master_id重新加载评论
      const child_comment_res=await get_child_comment_by_master_id(props.comment.id);
    console.log(child_comment_res);
    if(child_comment_res.code==0){
      //将子评论数据放在数组当中
      childComments.value=child_comment_res.data;
    }
    };


    //点击点赞后调用接口自增点赞量，并加载到页面
    const add_likes = async () => {
     
      //调用接口返回给数据库
      const add_like_res = await add_like(props.comment.id);
      if(add_like_res.code==0){
        console.log("点赞成功");
      }

      //根据id重新加载评论到页面
      const get_comment_by_id_res=await get_comment_by_id(props.comment.id);
      if(get_comment_by_id_res.code==0){
        likes.value=get_comment_by_id_res.data.likes;
      }
    };

    return {
     
      reply_button_status,
      commentContent,
      return_msg,
      add_likes,
      childComments,
      likes,
    };
  },
};
</script>
