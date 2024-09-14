export interface Disc {
    name : string
    author : string
    format : string
    matrix? : Array<Array<number>>
    country : string
    art: string
    id : string //  MongoID
  }

  export enum FORMAT {
    LP = "LP",
    CD = "CD",
    single = "single",
    cassette = "cassette",
    reelToReel = "reel to reel",
    minidisc = "minidisc",
    videocd = "videocd"
  }