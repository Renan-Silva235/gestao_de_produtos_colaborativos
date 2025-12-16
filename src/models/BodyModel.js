export default class BodyModel{
    #data;
    #csrf;

    constructor(body){
        const {csrf, ...data} = body;
        this.#data = data;
        this.#csrf = csrf;
    }

    get getCleanData(){
        return this.#data;
    }

    get getCsrf(){
        return this.#csrf;
    }

}
