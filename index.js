const data = require('./data.json');
const ranges = [18.5, 25, 30, 35, 40];
const bmiCategory = [
  'Underweight',
  'Normal weight',
  'Overweight',
  'Moderately obese',
  'Severel obese',
  'Very severely obese',
];
const healthRisk = ['Malnutrition risk', 'Low risk', 'Enhanced risk', 'Medium risk', 'High', 'Very high risk'];

const calculateBMI = (height, weight) => {
  const heightInCm = height / 100;
  const result = weight / (heightInCm * heightInCm);
  return Number(result.toFixed(2)); // round to 2 decimal
};

const findIndex = (bmi, ranges) => {
  // Assumption: ranges data should be sorted in asc order
  return ranges.findIndex((range) => range > bmi);
};

const addBMIResult = (item) => {
  const bmi = calculateBMI(item.HeightCm, item.WeightKg);
  const index = findIndex(bmi, ranges);
  const category = bmiCategory[index];
  const risk = healthRisk[index];

  return { ...item, BMI: bmi, category, risk };
};

const countBmiResult = (data, field, value) => {
  return data.filter((item) => item[field] === value).length;
};

const generateReport = () => {
  const result = data.map(addBMIResult);

  console.log(result);
  console.log(`Number of Normal weight people: ${countBmiResult(result, 'category', 'Normal weight')}`);
  console.log(`Number of Overweight people: ${countBmiResult(result, 'category', 'Overweight')}`);
  console.log(`Number of Very severely obese people: ${countBmiResult(result, 'category', 'Very severely obese')}`);
};

generateReport();

module.exports = { calculateBMI, findIndex, addBMIResult, countBmiResult };
