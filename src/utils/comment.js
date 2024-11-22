export default class Comment {
  constructor(
    id,
    content,
    create_user,
    master_id,
    post_id,
    likes,
    create_time,
    update_time
  ) {
    this.id = id;
    this.content = content; //评论内容
    this.create_user = create_user; //评论用户id
    this.master_id = master_id; //父评论id
    this.post_id = post_id; //评论文章id
    this.likes = likes; //评论点赞数
    this.create_time = create_time; //评论创建时间
    this.update_time = update_time; //评论更新时间
  }
}
