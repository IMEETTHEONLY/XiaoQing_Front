export default class Comment {
  constructor(
    id,
    content,
    create_user,
    master_id,
    post_id,
    likes,
    create_time,
    update_time,
    likes
  ) {
    this.id = id; //评论id
    this.content = content; //评论内容
    this.create_user = create_user; //评论用户id
    this.master_id = master_id; //父评论id
    this.post_id = post_id; //评论文章id
    this.likes = likes; //评论点赞数
    this.create_time = create_time; //评论创建时间
    this.update_time = update_time; //评论更新时间
    this.likes = likes; //评论点赞数
  }
  //返回数据对象
  getComment() {
    return {
      id: this.id,
      content: this.content,
      create_user: this.create_user,
      master_id: this.master_id,
      post_id: this.post_id,
      create_time: this.create_time,
      update_time: this.update_time,
      likes: this.likes,
    };
  }
}
