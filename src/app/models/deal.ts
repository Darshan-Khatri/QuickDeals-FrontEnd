
/*Be careful while writing data types because server sends data in camelCase so if you don't write your properties in camelCase then
  you will get response back from server but our angular page won't load that data because it does not find properties in camelCase here*/
export interface Deal {
  id: number;
  title: string;
  content: string;
  url: string;
  category: string;
  price: Number;
  created: Date;
  creator: string;
  likes: number;
  disLikes: number;
  photos: Photo[];
  comments: Comment[];
}

interface Photo {
  id: number;
  url: string;
}


export interface Comment {
  username: string;
  commentText: string;
  commentDate: Date;
  dealId: number;
}
