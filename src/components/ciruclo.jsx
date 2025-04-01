import React from 'react';

const RoundedImage = ({ src, alt, size = 150 }) => {
  const imageStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return <img src={src} alt={alt} style={imageStyle} />;
};

export default RoundedImage