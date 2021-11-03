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
  shops: [],
  status: 'idle',
  error: null,
}

export const fetchShops = createAsyncThunk('shops/fetchShops', async () => {
//   const response = await client.get('/fakeApi/shops')
    const response =
    await localDB.allDocs({ include_docs: true});
    const rows = response.rows.filter(element => element.doc.type === "shop" || element.doc.type === "shops")
    let shopsArray = []
    rows.forEach(element => shopsArray.push(element.doc))
    // console.log(shopsArray)

    return shopsArray;
})

export const addNewShop = createAsyncThunk(
  'shops/addNewShop',
  async (initialShop) => {
    // We receive initialShop as an object from addShopForm
    // we complete it additional fields before sving it into the database
    initialShop._id = "shop:" + new Date().toISOString()
    initialShop.type = "shop"
    initialShop.createdAt = new Date().toISOString()
    initialShop.updatedAt = new Date().toISOString()
    console.log(initialShop)
    const response = await localDB.put(initialShop)
    console.log(response)
    return response.data
  }
)

export const updateShop = createAsyncThunk(
  'shops/updateShop',
  async (updatedShop) => {
    const response = await localDB.get(updatedShop._id).then(doc => {
      // console.log("Retrieved: => ", doc)
      doc.title = updatedShop.title
      doc.city = updatedShop.city
      doc.category = updatedShop.category
      doc.description = updatedShop.description
      doc.updatedAt = new Date().toISOString()
      localDB.put(doc);

    })
    fetchShops()
    return response
  }
)

const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {
    // reactionAdded(state, action) {
    //   const { shopId, reaction } = action.payload
    //   const existingShop = state.shops.find((shop) => shop.id === shopId)
    //   if (existingShop) {
    //     existingShop.reactions[reaction]++
    //   }
    // },
    shopUpdated(state, action) {
      const { shopId, shopname, email, content } = action.payload
      const existingShop = state.shops.find((shop) => shop._id === shopId)
      if (existingShop) {
        existingShop.shopname = shopname
        existingShop.email = email
        existingShop.content = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchShops.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched shops to the array
        state.shops = state.shops.concat(action.payload)
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewShop.fulfilled, (state, action) => {
        state.shops.push(action.payload)
      })
      .addCase(updateShop.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  },
})

export const { shopAdded, shopUpdated, reactionAdded } = shopsSlice.actions

export default shopsSlice.reducer

export const selectAllShops = (state) => state.shops.shops

export const selectShopById = (state, shopId) =>
  state.shops.shops.find((shop) => shop._id === shopId)
