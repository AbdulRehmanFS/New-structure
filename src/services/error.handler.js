// Centralized error handling
export const handleApiError = (error) => {
  if (error?.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error?.request) {
    // Request made but no response received
    return {
      message: "No response from server",
      status: null,
    };
  } else {
    // Error in request setup
    return {
      message: error.message || "An unexpected error occurred",
      status: null,
    };
  }
};

export const errorMessage = (error) => {
  const handledError = handleApiError(error);
  return handledError.message || "Something went wrong";
};

