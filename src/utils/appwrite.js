import { Client, Account, Databases, Avatars, Storage, Teams } from 'appwrite'
import { API_ENDPOINT, PROJECT_ID } from './constants'

const client = new Client()

client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID)

export const users = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const teams = new Teams(client);
