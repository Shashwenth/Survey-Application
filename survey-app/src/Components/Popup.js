import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const TestPopup = () => (
  <div>
    <Popup
      trigger={<button className="button">Open Popup</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <div className="content"> Test Content </div>
          <div className="actions">
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </Popup>
  </div>
);

export default TestPopup;
