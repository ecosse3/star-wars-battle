// Generate array with two random numbers within provided length range from 0
export const generateRandomData = (length: number) => [
  Math.floor(Math.random() * length - 1) + 1,
  Math.floor(Math.random() * length - 1) + 1
];

// Normalizes comma-separated numbers and takes maximum value from range
const normalizeToNumber = (attribute: string) => {
  if (attribute.indexOf('-') > -1) {
    const values = attribute
      .split('-')
      .map((value: string) => Number(value.replace(',', '')));
    return Math.max(...values);
  }

  return Number(attribute.replace(',', ''));
};

// Returns higher attribute (normalized to number)
// OR -1 when two attributes are same
// OR opposite attribute if one is 'unknown'
export const calculateHigherAttribute = (attribute1: string, attribute2: string) => {
  if (attribute1 === 'unknown' && attribute2 === 'unknown') return -1;
  if (attribute1 === 'unknown') return attribute2;
  if (attribute2 === 'unknown') return attribute1;

  const number1 = normalizeToNumber(attribute1);
  const number2 = normalizeToNumber(attribute2);

  if (number1 > number2) return attribute1;
  if (number1 < number2) return attribute2;
  return -1;
};
