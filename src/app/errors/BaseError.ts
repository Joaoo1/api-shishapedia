class BaseError implements Error {
  public readonly message: string;

  public readonly status: number;

  public readonly name: string;

  constructor(statusCode: number, message: string, name = '') {
    this.status = statusCode;
    this.message = message;
    this.name = name;
  }
}

export { BaseError };
