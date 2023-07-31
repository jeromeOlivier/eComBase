import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const parseReduxError = (err: FetchBaseQueryError | SerializedError) => {
  // Check if it's a FetchBaseQueryError
  if ("data" in err && err.data) {
    // cast the unknown data to a known type with an optional message property
    // of type string
    const data = err.data as { message?: string };
    return data.message || JSON.stringify(data);
  } else {
    return "Something went wrong";
  }
};

export default parseReduxError;
