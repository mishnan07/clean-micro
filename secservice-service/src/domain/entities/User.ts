export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}