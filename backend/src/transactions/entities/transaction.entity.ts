export class Transaction {
  amount: number;
  timestamp: Date;

  constructor(amount: number, timestamp: Date) {
    this.amount = amount;
    this.timestamp = timestamp;
  }
}
