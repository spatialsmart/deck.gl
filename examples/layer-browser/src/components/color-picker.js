/* global document */
import React, {PureComponent} from 'react';

/*
 * convert a number to a hex string.
 * @param {number} x - number to convert
 * @param {number} len - minimum length of the string
 * @returns {string} formatted hex string
 */
function numberToHex(x, len = 0) {
  let str = x.toString(16);
  while (str.length < len) {
    str = `0${str}`;
  }
  return str;
}

/*
 * convert a color from [r, g, b] array or accessor to a hex string.
 * @param {string | array | function} value - color value or accessor
 * @returns {string} hex color string
 */
export function getColorHex(value) {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value) && value.length >= 3) {
    return `#${value
      .slice(0, 3)
      .map(v => numberToHex(v, 2))
      .join('')}`;
  }
  return '#888';
}

/*
 * convert a color from a hex string to [r, g, b] array.
 * @param {string} str - color hex string
 * @returns {array} color value in [r, g, b]
 */
export function getColorArray(str) {
  return [
    parseInt(str.slice(1, 3), 16),
    parseInt(str.slice(3, 5), 16),
    parseInt(str.slice(5, 7), 16)
  ];
}

export default class ColorPicker extends PureComponent {
  _onClick(color) {
    const {onChange} = this.props;
    const input = document.createElement('input');
    input.type = 'color';
    input.value = color;
    input.onchange = () => onChange(getColorArray(input.value));
    input.onblur = () => document.body.removeChild(input);

    document.body.appendChild(input);
    input.click();
  }

  render() {
    const color = getColorHex(this.props.value);
    return (
      <div
        className="color-picker"
        style={{background: color}}
        onClick={this._onClick.bind(this, color)}
      />
    );
  }
}
