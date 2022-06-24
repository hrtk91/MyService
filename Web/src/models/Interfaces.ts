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
  owner: IOwner;
}

export interface IOwner {
  userId: string;
  name: string;
  created: string;
  modified: string;
}
