import React from 'react';
import PropTypes from 'prop-types';

import formatDate from '../../utils/formatDate';

const ProfileExperience = ({
  experience: { company, title, from, to, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {formatDate(from)} - {!to ? 'Now' : formatDate(to)}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      {description && (
        <p>
          <strong>Description: </strong> {description}
        </p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
