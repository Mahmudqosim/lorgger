import { atom } from "recoil"

const defaultUserState = {
  user: null,
  profile: null,
  loggedIn: false
}

export const userState = atom({
  key: "user",
  default: defaultUserState,
})
