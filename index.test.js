const calculator = require('./index');

describe('Body massive index calculator', () => {
  const ranges = [18.5, 25, 30, 35, 40];

  it('should calculate the BMI correctly', () => {
    expect(calculator.calculateBMI(175, 75)).toBe(24.49);
  });

  it('should find the index of the given BMI (1)', () => {
    expect(calculator.findIndex(15, ranges)).toBe(0);
    expect(calculator.findIndex(18.4, ranges)).toBe(0);
  });

  it('should find the index of the given BMI (2)', () => {
    expect(calculator.findIndex(18.5, ranges)).toBe(1);
    expect(calculator.findIndex(21, ranges)).toBe(1);
  });

  it('should find the index of the given BMI (3)', () => {
    expect(calculator.findIndex(35, ranges)).toBe(4);
    expect(calculator.findIndex(39.9, ranges)).toBe(4);
  });

  it('should find the index of the given BMI (4)', () => {
    expect(calculator.findIndex(40, ranges)).toBe(-1);
    expect(calculator.findIndex(45, ranges)).toBe(-1);
  });

  it('should add the BMI result to given item (1)', () => {
    const data = {
      Gender: 'Male',
      HeightCm: 180,
      WeightKg: 77,
    };

    const result = {
      Gender: 'Male',
      HeightCm: 180,
      WeightKg: 77,
      BMI: 23.77,
      category: 'Normal weight',
      risk: 'Low risk',
    };

    expect(calculator.addBMIResult(data)).toEqual(result);
  });

  it('should add the BMI result to given item (2)', () => {
    const data = {
      Gender: 'Female',
      HeightCm: 167,
      WeightKg: 82,
    };

    const result = {
      Gender: 'Female',
      HeightCm: 167,
      WeightKg: 82,
      BMI: 29.4,
      category: 'Overweight',
      risk: 'Enhanced risk',
    };

    expect(calculator.addBMIResult(data)).toEqual(result);
  });

  it('should count the given field and value in the given data', () => {
    const data = require('./test-data.json');

    const normalWeightCount = calculator.countBmiResult(data, 'category', 'Normal weight');
    const overweightCount = calculator.countBmiResult(data, 'category', 'Overweight');
    const verySeverelyObeseCount = calculator.countBmiResult(data, 'category', 'Very severely obese');

    expect(normalWeightCount).toBe(2);
    expect(overweightCount).toBe(1);
    expect(verySeverelyObeseCount).toBe(0);
  });
});
