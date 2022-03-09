import { AuthResponse } from "./vuex"

interface AuthData {
	username: string
	password: string
}

export interface ClientToServer {
	register: (data: AuthData, callback: (res: AuthResponse) => void) => void 
	login: (data: AuthData, callback: (res: AuthResponse) => void) => void 
}