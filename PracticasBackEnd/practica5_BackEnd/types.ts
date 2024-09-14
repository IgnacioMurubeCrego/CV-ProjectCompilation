export type User =  {
    id : string,
    name : string,
    mail : string,
    collection : ComicCollection
}

export type Comic = {
    id : string,
    title : string,
    description : string,
    format : string 
}

export type ComicCollection = {
    id : string,
    name : string,
    comics : Comic[]
}