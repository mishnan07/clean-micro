export class BankDetail {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankName: string,
    public readonly accountNumber: string,
    public readonly routingNumber: string,
    public readonly accountType: 'checking' | 'savings',
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  public getMaskedAccountNumber(): string {
    return `****${this.accountNumber.slice(-4)}`;
  }
}