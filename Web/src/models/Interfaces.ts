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
  ownerId: string;
}
