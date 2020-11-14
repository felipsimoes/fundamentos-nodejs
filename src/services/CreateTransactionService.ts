import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type } : Request): Transaction {
    const newTransaction = new Transaction({title, value, type } )

    if (type == 'outcome' && value > this.transactionsRepository.getBalance().total) {
      throw Error("Não é possível retirar um valor que não existe em saldo")
    }

    this.transactionsRepository.create(newTransaction)
    return newTransaction
  }
}

export default CreateTransactionService;
