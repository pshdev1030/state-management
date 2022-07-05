export const is =
  Object.is ||
  function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
      // 0===-0 은 true이기 때문에 0!==-0 은 false이다.
      // +0,-0 경우가 아니라면 true 반환
    } else {
      return x !== x && x !== y;
      // NaN===NaN 은 false  NaN일 경우
    }
  };

function shallow(x, y) {
  if (is(x, y)) return true;
  // 같은 값일 경우 true

  if (
    typeof x !== "object" ||
    x === null ||
    typeof y !== "object" ||
    y === null
  )
    return false;

  const keyX = Object.keys(x);
  const keyY = Object.keys(y);

  if (keyX.length !== keyY.length) return false;

  for (let i = 0; i < keyY.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(x, keyY[i]) ||
      !is(x[keyX[i]], y[keyX[i]])
    ) {
      // 객체에 해당 key가 없거나, depth1 까지 같은지 탐색 후 없으면 false
      return false;
    }
  }
  return true;
}

export default shallow;
