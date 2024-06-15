import {ApiService} from "./apiService";
import {LocalStore} from "./localStore";
import {Closable} from "../domain/helper/scope";

export class Repository implements Closable {
    instanceId: string;
    private latestCount: number = 0;

    constructor(
        private apiService: ApiService,
        private localStore: LocalStore
    ) {
        this.instanceId = Math.random().toString(36).slice(2);
    }

    getLatestCount() {
        return this.latestCount
    }

    setLatestCount(count: number) {
        this.latestCount = count;
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

    close(): void {
        console.log("Close repo")
    }
}