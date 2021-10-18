import { createSlice } from '@reduxjs/toolkit'

import PouchDB from 'pouchdb'
//DATABASE
const localDB = new PouchDB('reactcrudrtk')
const remoteDB = new PouchDB('http://localhost:5984/reactcrudrtk', {
    auth: {
        offername: "demba",
        password: "242$Brazzaville"
    }
})
function sync () { 
  return localDB.sync(remoteDB, {live: true, retry: true}) 
}
sync()

export const initialState = {
  loading: false,
  hasErrors: false,
  offers: [],
}

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    getOffers: state => {
      state.loading = true
    },
    getOffersSuccess: (state, { payload }) => {
      state.offers = payload
      state.loading = false
      state.hasErrors = false
    },
    getOffersFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const {
  getOffers,
  getOffersSuccess,
  getOffersFailure,
} = offersSlice.actions
export const offersSelector = state => state.offers
export default offersSlice.reducer

export function fetchOffers(shopId) {
  return async dispatch => {
    dispatch(getOffers())

    try {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/offers?postId=${postId}`
    //   )
    //   const data = await response.json()

      const response = await localDB.allDoc({ include_docs: true })
      const data = response.rows.filter(element => element.doc.type === "offer" || element.doc.type === "offers");
      let offersArray = []
      data.forEach(element => offersArray.push(element.doc))

      dispatch(getOffersSuccess(offersArray))
    } catch (error) {
      dispatch(getOffersFailure())
    }
  }
}

export function addOffer() {
    return async dispatch => {
        dispatch(addOffer())
        try {

        } catch (err) {
            dispatch(addOfferFailure())
        }
    }
}
