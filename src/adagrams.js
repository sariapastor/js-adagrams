class Adagrams {
  static LETTER_POOL = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };

  static SCORE_CHART = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10,
  };

  static drawLetters() {
    const pool = Object.entries(this.LETTER_POOL).flatMap(([letter, qty]) =>
      Array(qty).fill(letter)
    );
    const hand = [];
    while (hand.length < 10) {
      const draw = Math.floor(Math.random() * pool.length);
      const [letter] = pool.splice(draw, 1);
      hand.push(letter);
    }
    return hand;
  }

  static usesAvailableLetters(input, lettersInHand) {
    const word = input.toUpperCase();
    const letterBank = lettersInHand.slice();
    for (const letter of word) {
      const index = letterBank.findIndex((item) => item === letter);
      if (index === -1) {
        return false;
      }
      letterBank.splice(index, 1);
    }
    return true;
  }

  static scoreWord(word) {
    const bonusScore = word.length > 6 ? 8 : 0;
    return Array.from(word.toUpperCase())
      .map((letter) => this.SCORE_CHART[letter])
      .reduce((prev, cur) => prev + cur, bonusScore);
  }

  static higher(a, b) {
    if (a.score !== b.score) {
      return a.score > b.score ? a : b;
    }
    if (a.word.length === b.word.length) {
      return a;
    }
    if (a.word.length === 10) {
      return a;
    }
    if (b.word.length === 10) {
      return b;
    }
    return a.word.length < b.word.length ? a : b;
  }

  static highestScoreFrom(words) {
    return words
      .map((word) => ({ word: word, score: this.scoreWord(word) }))
      .reduce((prev, cur) => this.higher(prev, cur));
  }
}

export default Adagrams;
