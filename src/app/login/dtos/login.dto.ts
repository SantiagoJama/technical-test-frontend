export interface LoginResponseDTO {
    code : string,
    status : string,
    response : Response,
    token : string
}

export interface Response{
    message : string,
    userName : string
}