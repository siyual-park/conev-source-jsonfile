class CantReadFileError extends Error {
  constructor(message = 'Cant read file error.') {
    super(message);
  }
}

export default CantReadFileError;
