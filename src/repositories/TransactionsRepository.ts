import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface CreateTransaction {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.filter(t => t.type === 'income').map(t => t.value).reduce((this.sumValues),0);
    const totalOutcome = this.transactions.filter(t => t.type === 'outcome').map(t => t.value).reduce((this.sumValues),0);
    const total = (totalIncome - totalOutcome);
    return { income: totalIncome, outcome: totalOutcome, total }
  }

  public create(createTransaction : CreateTransaction): Transaction {
    const transaction = new Transaction(createTransaction)
    this.transactions.push(transaction)
    return transaction
  }

  private sumValues(acc: any, total: any) {
    return acc + total
  }
}

export default TransactionsRepository;
