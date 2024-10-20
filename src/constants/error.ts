export function CustomError(
  statusCode: number,
  message: string,
  success = false
) {
  const error = {
    success,
    statusCode,
    message,
  };
  return error;
}
