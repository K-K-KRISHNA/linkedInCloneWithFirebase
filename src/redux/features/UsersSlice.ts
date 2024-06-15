import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { EachMessage, EachPost, EachUser } from "../../types/GlobalTypes";

export interface InitialStateType {
  users: EachUser[];
  activeUser: EachUser | null;
  posts: EachPost[];
  activeChatWith: EachUser["id"] | null;
  activeChatHistory: EachMessage[];
  allMessages: EachMessage[];
}
const initialState: InitialStateType = {
  users: [],
  activeUser: null,
  posts: [],
  activeChatWith: null,
  activeChatHistory: [],
  allMessages: [],
};

export const gettingAllUsers = createAsyncThunk("gettingAllUsers", async () => {
  const response = await getDocs(collection(db, "users"));
  return response.docs.map((doc) => ({ ...doc.data() }));
});

export const addUser = createAsyncThunk(
  "addingUser",
  async (user: EachUser) => {
    return await setDoc(doc(db, "users", user.id), user);
  }
);

export const setActiveUser = createAsyncThunk(
  "settingActiveUser",
  async (id: string) => {
    const response = await getDoc(doc(db, "users", id));
    return response.data();
  }
);

export const posting = createAsyncThunk(
  "adding a new post",
  async (newPost: EachPost) => {
    return await setDoc(doc(db, "posts", String(newPost.postId)), newPost);
  }
);

export const gettingPosts = createAsyncThunk("gettingPosts", async () => {
  const response = await getDocs(collection(db, "posts"));
  return response.docs.map((doc) => doc.data());
});

export const postUpGradation = createAsyncThunk(
  "PostUpGradation",
  async (updatedPost: EachPost) => {
    return await setDoc(
      doc(db, "posts", String(updatedPost.postId)),
      updatedPost
    );
  }
);

export const gettingMessages = createAsyncThunk("gettingMessages", async () => {
  const response = await getDocs(collection(db, "messages"));
  return response.docs.map((each) => each.data());
});

export const sendingMessage = createAsyncThunk(
  "sendingMessage",
  async (message: EachMessage) => {
    return await setDoc(doc(db, "messages", message.messageId + ""), message);
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    settingActiveChatUser: (state, action: PayloadAction<EachUser["id"]>) => {
      state.activeChatWith = action.payload;
    },
    clearingStore: (state) => {
      state.activeUser = null;
      state.activeChatWith = null;
      state.activeChatHistory = [];
      state.users = [];
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, () => {});
    builder.addCase(
      setActiveUser.fulfilled,
      (state, action: PayloadAction<DocumentData | undefined>) => {
        state.activeUser = action.payload as EachUser;
        localStorage.setItem("activeUser", JSON.stringify(action.payload?.id));
      }
    );
    builder.addCase(posting.fulfilled, () => {
      console.log("posting fulfilled");
    });
    builder.addCase(gettingPosts.fulfilled, (state, action) => {
      state.posts = action.payload as EachPost[];
      state.posts.sort((post1, post2) => post2.time.localeCompare(post1.time));
    });
    builder.addCase(gettingAllUsers.fulfilled, (state, action) => {
      state.users = action.payload as EachUser[];
    });
    builder.addCase(postUpGradation.fulfilled, () => {
      console.log("postUpGradation fulfilled");
    });
    builder.addCase(
      gettingMessages.fulfilled,
      (state, action: PayloadAction<DocumentData | undefined>) => {
        const allMessages = action.payload as EachMessage[];
        state.allMessages = allMessages;
        state.activeChatHistory = allMessages.filter((eachMessage) => {
          console.log(
            (eachMessage.senderId === state.activeUser?.id &&
              eachMessage.receiverId === state.activeChatWith) ||
              (eachMessage.senderId === state.activeChatWith &&
                eachMessage.receiverId === state.activeUser?.id),
            "condition"
          );
          return (
            (eachMessage.senderId === state.activeUser?.id &&
              eachMessage.receiverId === state.activeChatWith) ||
            (eachMessage.senderId === state.activeChatWith &&
              eachMessage.receiverId === state.activeUser?.id)
          );
        });

        state.activeChatHistory.sort((msg1, msg2) =>
          msg1.time.localeCompare(msg2.time)
        );
        console.log(state.activeChatHistory, "activechat");
      }
    );
    builder.addCase(sendingMessage.fulfilled, () => {
      console.log("sendingMessage fulfilled");
    });
  },
});

export default userSlice.reducer;
export const { settingActiveChatUser, clearingStore } = userSlice.actions;
