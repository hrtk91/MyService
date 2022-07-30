export interface IToken {
  token: string;
}

export interface IPicture {
  pictureId: string;
  fileName: string;
}

export interface IArticle {
  articleId: string;
  pictures: IPicture[];
  comments: IArticleComment[];
  likes: ILike[];
  owner: IOwner;
}

export interface IOwner {
  userId: string;
  name: string;
  created: string;
  modified: string;
}

export interface IArticleComment {
  articleCommentId: string;
  articleId: string;
  content: string;
  owner: IOwner;
}

export interface ILike {
  likeId: string;
  owner: IOwner;
}
