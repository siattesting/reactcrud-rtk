import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { selectOfferById, updateOffer } from './offersSlice'

export const EditOfferForm = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { offerId } = match.params
    const offer = useSelector(state => selectOfferById(state, offerId))
    console.log(offer)
    
    const [title, setTitle] = useState(offer.title)
    const [category, setCategory] = useState(offer.category)
    const [description, setDescription] = useState(offer.description)
    const [city, setCity] = useState(offer.city)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')


    const onTitleChanged = e => setTitle(e.target.value)
    const onCategoryChanged = e => setCategory(e.target.value)    
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCityChanged = e => setCity(e.target.value)

    const canSave = [title, category, description, city].every(Boolean) && addRequestStatus === 'idle';

    const onSaveOfferClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(
                    updateOffer({ _id: offerId, title, category, description, city })
                ).unwrap();
                setTitle('')
                setCategory('')
                setDescription('')
                setCity('')

            } catch (err) {
                console.error('Failed to save this item:',  err)
            } finally {
                setAddRequestStatus('idle')
                history.push(`/offers/${offerId}`)
            }
        }
    };

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
            <label htmlFor="category">Category:</label>
            <input
              className="w3-input" 
              type="category"
              id="category"
              name="category"
              placeholder="What's your offers's category?"
              value={category}
              onChange={onCategoryChanged}
            />
            <label htmlFor="description">Decription:</label>
            <textarea
              className="w3-input" 
              type="description"
              id="description"
              name="description"
              placeholder="Describe your offer..."
              value={description}
              onChange={onDescriptionChanged}
            />
            <label htmlFor="city">City:</label>
            <input
              className="w3-input" 
              type="city"
              id="city"
              name="city"
              placeholder="Where is your offer?"
              value={city}
              onChange={onCityChanged}
            />
            <div className="w3-container">
                <div className="w3-bar">
                    <button type="button" className="w3-button w3-white w3-border w3-border-green" onClick={onSaveOfferClicked} disabled={!canSave}>
                    Save Offer
                    </button>           

                    <Link to={`/offers/${offer._id}`} className="w3-button w3-white w3-border w3-border-red" >
                    Cancel
                    </Link>
                </div> 
            </div>
          </form>
        </section>
      );
}
