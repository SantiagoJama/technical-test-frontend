export interface LoginResponseDTO {
    code : string,
    status : string,
    response : Response
}

export interface Response{
    message : string,
    userName : string
}