import React, { useState} from 'react'
import { useDispatch } from 'react-redux';

import { addNewOffer } from './offersSlice'

export const AddOfferForm = ({ match }) => {
    const dispatch = useDispatch()
    const { shopId } = match.params
    console.log(shopId)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')


    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)

    const canSave = [title, description, price].every(Boolean) && addRequestStatus === 'idle';

    const onSaveOfferClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(
                    addNewOffer({ _id: 'offer:'+ new Date().toISOString(), title, description, price, shop: shopId })
                ).unwrap();
                setTitle('')
                setDescription('')
                setPrice('')

            } catch (err) {
                console.error('Failed to save this item:',  err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    };

    //An offer must be associated to a shop
    // TO DO: create a shop selectof into the form
    // const shopsSelection = () => {
    //
    // }

    return (
        <section>
          <h2>Add a New Offer</h2>
          <form className="w3-container">
            <label htmlFor="title">Offer Title:</label>
            <input
              className="w3-input"
              type="text"
              id="title"
              name="title"
              placeholder="What's your offer name?"
              value={title}
              onChange={onTitleChanged}
            />
            <label htmlFor="description">Decription:</label>
            <textarea
              className="w3-input"
              type="text"
              id="description"
              name="description"
              placeholder="Describe your offer..."
              value={description}
              onChange={onDescriptionChanged}
            />
            <label htmlFor="price">Price:</label>
            <input
              className="w3-input"
              type="number"
              id="price"
              name="price"
              placeholder=""
              value={price}
              onChange={onPriceChanged}
            />
            <button type="button" className="w3-btn w3-blue" onClick={onSaveOfferClicked} disabled={!canSave}>
              Save Offer
            </button>
          </form>
        </section>
      );
}
