import { atom } from "recoil"

const defaultPostsState = {
  posts: [],
}

export const postsState = atom({
  key: "posts",
  default: defaultPostsState,
})
