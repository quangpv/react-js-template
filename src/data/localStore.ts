export class LocalStore {

    getLatestCount(): number {
        return parseInt(localStorage.getItem("count") || "0")
    }

    setLatestCount(count: number) {
        localStorage.setItem("count", String(count))
    }

    getToken() {
        return localStorage.getItem('token')
    }

    setToken(token: string) {
        localStorage.setItem("token", token)
    }

    removeToken() {
        localStorage.removeItem("token")
    }
}