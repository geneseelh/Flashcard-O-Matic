import React, { useState } from "react";

function DeckForm({ submitHandler, initialFormData, cancelHandler }) {
  const [formData, setFormData] = useState(initialFormData);
console.log(formData)

  function formChangeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function formSubmitHandler(e) {
    e.preventDefault();
    submitHandler(formData);
  }

  return (
    <div>
      <form>
        <fieldset>
          <div>
            <label htmlFor="form-name">Name</label>
            <input
              onChange={formChangeHandler}
              id="form-name"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Deck Name"
            />
          </div>
        </fieldset>
        <div>
          <label htmlFor="form-description">Description</label>
          <textarea
            onChange={formChangeHandler}
            id="form-description"
            name="description"
            value={formData.description}
            placeholder="Brief description of the deck"
          ></textarea>
        </div>
        <div>
          <button type="cancel" onClick={cancelHandler}>Cancel</button>
          <button type="submit" onClick={formSubmitHandler}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;
