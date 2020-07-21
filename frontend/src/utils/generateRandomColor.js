import { rgbToColorString, darken } from 'polished';

const generateRandomColor = () => {
  const randomRGB = {
    red: Math.round(Math.random() * 255),
    green: Math.round(Math.random() * 255),
    blue: Math.round(Math.random() * 255),
  };

  const randomColor = darken(0.1, rgbToColorString(randomRGB)).slice(1);

  return randomColor;
};

export default generateRandomColor;
