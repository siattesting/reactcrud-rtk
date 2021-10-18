import React, { useState} from 'react'
import { useDispatch } from 'react-redux';

import { addNewShop } from './shopsSlice'

export const AddShopForm = () => {
    const dispatch = useDispatch()
    
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')


    const onTitleChanged = e => setTitle(e.target.value)
    const onCategoryChanged = e => setCategory(e.target.value)    
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCityChanged = e => setCity(e.target.value)

    const canSave = [title, category, description, city].every(Boolean) && addRequestStatus === 'idle';

    const onSaveShopClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(
                    addNewShop({ _id: 'shop:'+ new Date().toISOString(), title, category, description, city })
                ).unwrap();
                setTitle('')
                setCategory('')
                setDescription('')
                setCity('')

            } catch (err) {
                console.error('Failed to save this item:',  err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    };

    return (
        <section>
          <h2>Add a New Shop</h2>
          <form className="w3-container">
            <label htmlFor="title">Shop Title:</label>
            <input
              className="w3-input" 
              type="text"
              id="title"
              name="title"
              placeholder="What's your shop name?"
              value={title}
              onChange={onTitleChanged}
            />
            <label htmlFor="category">Category:</label>
            <input
              className="w3-input" 
              type="category"
              id="category"
              name="category"
              placeholder="What's your shops's category?"
              value={category}
              onChange={onCategoryChanged}
            />
            <label htmlFor="description">Decription:</label>
            <textarea
              className="w3-input" 
              type="description"
              id="description"
              name="description"
              placeholder="Describe your shop..."
              value={description}
              onChange={onDescriptionChanged}
            />
            <label htmlFor="city">City:</label>
            <input
              className="w3-input" 
              type="city"
              id="city"
              name="city"
              placeholder="Where is your shop?"
              value={city}
              onChange={onCityChanged}
            />
            <button type="button" className="w3-btn w3-blue" onClick={onSaveShopClicked} disabled={!canSave}>
              Save Shop
            </button>
          </form>
        </section>
      );
}
