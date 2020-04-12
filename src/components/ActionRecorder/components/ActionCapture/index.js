import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ActionCapture = ({ type, payload }) => (
  <div className="action-capture">
    <div className="action-capture__type">{type}</div>
    <div className="action-capture__payload">
      {JSON.stringify(payload).split('"').join(' ')}
    </div>
  </div>
);

ActionCapture.propTypes = {
  type: PropTypes.string.isRequired,
  payload: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    itemName: PropTypes.string,
    itemDescription: PropTypes.string,
    itemCreatedDate: PropTypes.string
  }).isRequired
};

export default ActionCapture;
