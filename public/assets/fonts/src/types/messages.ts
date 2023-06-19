export interface Message {
    manager: string,
    subject: string,
    date: string | Date,
    text: string,
    title: string,
    body: string,
}

export type Messages = Message[];
