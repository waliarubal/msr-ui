class Auth {
    constructor() {
        this.authenticated = true;
    }
    login(cb){
        this.authenticated = true;
    }
    logout(cb) {
        this.authenticated = false;
    }
    isAuthenticated(){
        return this.authenticated
    }
}
export default new Auth();