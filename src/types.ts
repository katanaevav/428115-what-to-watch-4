export interface Movie {
  id: number,
  title: string,
  smallPoster: string,
  genre: string,
  year: number,
  runTime: number,
  bigPoster: string,
  cover: string,
  ratingScore: number,
  ratingCount: number,
  preview: string,
  video: string,
  directors: Array<string>,
  starrings: Array<string>,
  descriptions: Array<string>,
  backgroundColor: string,
  isFavorite: boolean,
}

export interface Comment {
  id: number,
  text: string,
  author: string,
  date: number,
  mark: number,
}
