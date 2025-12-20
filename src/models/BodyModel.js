export default class BodyModel{
    constructor(body){
        const {_csrf, ...data} = body;
        this.data = data;
        this._csrf = _csrf;
    }
}
