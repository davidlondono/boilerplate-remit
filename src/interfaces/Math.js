const { Algebra, math } = require('../helper/publisher');

const sum = (a, b) => ({ ok: true, data: (a + b) });

const pow = async (a, b) => ({ ok: true, data: (a * b) });

const sumInternal = async (a, b) => {
  const data = await math.sum({ a, b });
  return { ok: true, data };
};
const mulptMatrix = async (a, b) => {
  const matrixA = await Algebra.createMatrix(a);
  const matrixB = await Algebra.createMatrix(b);
  const data = await Algebra.multiply({ a: matrixA, b: matrixB });
  return { ok: true, data };
};
const bussinessError = async () => ({ error: 'BUSINESS_ERROR', ok: false });
const errorServer = async () => { throw new Error('Server error'); };

module.exports = {
  sum, pow, bussinessError, errorServer, sumInternal, mulptMatrix,
};
