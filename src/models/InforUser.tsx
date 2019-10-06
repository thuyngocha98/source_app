export default class InforUser {
    UserToken: string;
    UserName?: string;
    UserEmail?: string;  
    UserId?: string;
    constructor(
        UserToken?: string,
        UserName?: string,
        UserEmail?: string,  
        UserId?: string,
    ) {
        this.UserToken = UserToken;
        this.UserName = UserName;
        this.UserEmail = UserEmail;
        this.UserId = UserId;
    }
  }