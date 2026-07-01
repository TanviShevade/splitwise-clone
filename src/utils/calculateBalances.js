export const calculateBalances = (expenses, members) => {
  const balances = {};

  members.forEach(m => {
    balances[m.name] = 0;
  });

  expenses.forEach(exp => {
    // NORMAL EXPENSE
    if (exp.type === "expense") {
      const share = exp.amount / exp.splitBetween.length;

      exp.splitBetween.forEach(person => {
        if (person !== exp.paidBy) {
          balances[person] -= share;
          balances[exp.paidBy] += share;
        }
      });
    }

    // SETTLEMENT
    if (exp.type === "settlement") {
      balances[exp.paidBy] += exp.amount;
      balances[exp.paidTo] -= exp.amount;
    }
  });

  return balances;
};
