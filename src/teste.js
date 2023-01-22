let number = 5;

const solution = (n) => {
  if (n > 5) {
    return solution(n - 1);
  }
};

console.log(solution(number));
