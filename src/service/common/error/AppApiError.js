class AppApiError extends Error {
  constructor(httpError, message) {
    super();
    this.message = message;
    this.data = httpError?.response?.data;
    this.originError = httpError;
  }

  get apiMessage() {
    return this.message || this.data?.meta?.message || "Invalid error";
  }
}

export { AppApiError };
