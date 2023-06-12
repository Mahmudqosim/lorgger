import { Client, Account, Databases, Avatars, Storage, Teams } from 'appwrite'

const client = new Client()

client.setEndpoint(import.meta.env.VITE_API_ENDPOINT).setProject(import.meta.env.VITE_PROJECT_ID)

const users = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client);
const avatars = new Avatars(client);
const teams = new Teams(client);

export default { users, databases, storage, avatars, teams }