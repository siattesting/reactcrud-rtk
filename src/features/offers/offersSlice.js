import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import PouchDB from 'pouchdb'
//DATABASE
const localDB = new PouchDB('reactcrudrtk')
localDB.info()
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
  offers: [],
  status: 'idle',
  error: null,
  loading: false,
  hasErrors: false,
}

export const fetchOffers = createAsyncThunk('offers/fetchOffers', async () => {
    const response = 
    await localDB.allDocs({ include_docs: true});
    const rows = response.rows.filter(element => element.doc.type === "offer" || element.doc.type === "offers")
    let offersArray = []
    rows.forEach(element => offersArray.push(element.doc))

    return offersArray;
})

export const addNewOffer = createAsyncThunk(
  'offers/addNewOffer',
  async (initialOffer) => {
    // We receive initialOffer as an object from addOfferForm
    // we complete it additional fields before sving it into the database
    initialOffer._id = "offer:" + new Date().toISOString()
    initialOffer.type = "offer"
    // initialOffer.shop = shopId
    initialOffer.createdAt = new Date().toISOString()
    initialOffer.updatedAt = new Date().toISOString()
    console.log(initialOffer)
    const response = await localDB.put(initialOffer)
    console.log(response)
    return response.data
  }
)

export const updateOffer = createAsyncThunk(
  'offers/updateOffer',
  async (updatedOffer) => {
    const response = await localDB.get(updatedOffer._id).then(doc => {
      // console.log("Retrieved: => ", doc)
      doc.title = updatedOffer.title
      doc.price = updatedOffer.price
      doc.description = updatedOffer.description
      doc.updatedAt = new Date().toISOString()
      localDB.put(doc);
    })
    fetchOffers()
    return response
  }
)

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    offerUpdated(state, action) {
      const { offerId, title, email, content } = action.payload
      const existingOffer = state.offers.find((offer) => offer._id === offerId)
      if (existingOffer) {
        existingOffer.title = title
        existingOffer.price = email
        existingOffer.description = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched offers to the array
        state.offers = state.offers.concat(action.payload)
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload)
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  },
})

export const { offerAdded, offerUpdated, reactionAdded } = offersSlice.actions

export default offersSlice.reducer

export const selectAllOffers = (state) => state.offers.offers

export const selectOfferById = (state, offerId) =>
  state.offers.offers.find((offer) => offer._id === offerId)
