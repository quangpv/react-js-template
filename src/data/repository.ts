import {ApiService} from "./apiService";
import {LocalStore} from "./localStore";

export class Repository {
    constructor(
        private apiService: ApiService,
        private localStore: LocalStore) {
    }

    getLatestCount() {
        return this.localStore.getLatestCount()
    }

    setLatestCount(count: number) {
        this.localStore.setLatestCount(count)
    }

    isLoggedIn(): boolean {
        return this.localStore.getToken() != null
    }

    async login() {
        this.localStore.setToken("token")
    }

    logout() {
        this.localStore.removeToken()
    }
}