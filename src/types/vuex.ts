export interface UserType {
	id?: string
	_id?: string
	username: string
	contacts: UserType[]
	bio?: string
	userPic?: string
}

export interface MessageType {
	content: string
	date: Date,
	sender: string,
	receiver: string,
}

export interface Messages {
	[key: string]: any
	chat: string
	msg: MessageType
}

export interface AuthResponse {
	success: boolean;
	message: string;
	token?: string;
	user?: UserType;
	error?: string;
}