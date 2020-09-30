

export interface UploadBeat
{
  producer:string;
  beatName:string;
  price:string;
  beatGenre:string;
  year:string;
  beatDescription:string;
  beatCoverImage?:File;
  demoBeatUrl:string;
  userId:any;
  count?:number;
  originalBeatUrl:string;
}
