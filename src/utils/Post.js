export default class Post {
  constructor(id, content, create_user, create_time, update_time) {
    this.id = id; // 帖子id
    this.content = content; // 帖子内容
    this.create_user = create_user; //用来记录创建者
    this.create_time = create_time; //用来记录创建时间
    this.update_time = update_time; //用来记录更新时间
    this.comments = []; // 初始化一个空数组来存储评论
  }
}
