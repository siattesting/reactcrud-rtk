import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import PouchDB from 'pouchdb'
//DATABASE
const localDB = new PouchDB('reactcrudrtk')
const remoteDB = new PouchDB('http://localhost:5984/reactcrudrtk', {
    auth: {
        username: "demba",
        password: "242$Brazzaville"
    }
})
function sync () { 
  return localDB.sync(remoteDB, {live: true, retry: true}) 
}
sync()

//STATE
const initialState = {
  users: [],
  status: 'idle',
  error: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await client.get('/fakeApi/users')  
    const response = 
    await localDB.allDocs({ include_docs: true});
    const rows = response.rows.filter(element => element.doc.type === "user" || element.doc.type === "users")
    let usersArray = []
    rows.forEach(element => usersArray.push(element.doc))
    // console.log(usersArray)

    return usersArray;
})

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (initialUser) => {
    initialUser._id = "user:" + new Date().toISOString()
    initialUser.type = "user"
    initialUser.createdAt = new Date().toISOString()
    initialUser.updatedAt = new Date().toISOString()
    const response = await localDB.put(initialUser)
    console.log(response)
    return response.data
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser) => {
    const response = await localDB.get(updatedUser._id).then(doc => {
      // console.log("Retrieved: => ", doc)
      doc.username = updatedUser.username
      doc.email = updatedUser.email
      doc.updatedAt = new Date().toISOString()
      localDB.put(doc);
    })
    fetchUsers()
    return response
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // reactionAdded(state, action) {
    //   const { userId, reaction } = action.payload
    //   const existingUser = state.users.find((user) => user.id === userId)
    //   if (existingUser) {
    //     existingUser.reactions[reaction]++
    //   }
    // },
    userUpdated(state, action) {
      const { userId, username, email, content } = action.payload
      const existingUser = state.users.find((user) => user._id === userId)
      if (existingUser) {
        existingUser.username = username
        existingUser.email = email
        existingUser.content = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched users to the array
        state.users = state.users.concat(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  },
})

export const { userAdded, userUpdated, reactionAdded } = usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers = (state) => state.users.users

export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user._id === userId)
