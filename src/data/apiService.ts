import {Closable} from "../domain/helper/scope";

export class ApiService implements Closable {

    getList() {
        return ""
    }

    close() {
        console.log("Close api service")
    }
}