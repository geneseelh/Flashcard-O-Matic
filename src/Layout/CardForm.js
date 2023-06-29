import React, { useState } from "react";

function CardForm({ initialFormData, saveHandler, cancelHandler }) {
  const [formData, setFormData] = useState(initialFormData);
// console.log(initialFormData)
  function formChangeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // SAVE BUTTON HANDLER
  function formSaveHandler(e) {
    e.preventDefault();
    saveHandler(formData);
    setFormData(initialFormData);
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="card-front">Front</label>
          <textarea
            onChange={formChangeHandler}
            id="card-front"
            type="text"
            name="front"
            value={formData.front}
            placeholder="Front side of card"
          ></textarea>
        </div>
        <div>
          <label htmlFor="card-back">Back</label>
          <textarea
            onChange={formChangeHandler}
            id="card-back"
            name="back"
            value={formData.back}
            placeholder="Back side of card"
          ></textarea>
        </div>
        <div>
          <button type="done" onClick={cancelHandler}>
            Done
          </button>
          <button type="save" onClick={formSaveHandler}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
