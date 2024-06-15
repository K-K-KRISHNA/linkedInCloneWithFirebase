export interface EachUser {
  id: string;
  userName: string;
  email: string;
  password: string;
}

interface EachLikeType {
  type: "LIKE" | "CELEBRATE" | "SUPPORT" | "LOVE" | "INSIGHTFUL" | "FUNNY";
}

export interface EachLike {
  likeId: number;
  likedBy: EachUser["id"];
  type: EachLikeType["type"];
}

export interface EachComment {
  commentId: number;
  text: string;
  commentedBy: EachUser["id"];
  likes: EachLike[];
}

export interface EachPost {
  postedBy: EachUser["id"];
  postId: number;
  text: string;
  imageUrl?: string;
  likes: EachLike[];
  comments: EachComment[];
  time: string;
}

export interface EachMessage {
  messageId: number;
  senderId: EachUser["id"];
  receiverId: EachUser["id"];
  text: string;
  time: string;
}
