class BaseError extends Error {
  public readonly message: string;

  public readonly status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = statusCode;
    this.message = message;
  }
}

export { BaseError };
