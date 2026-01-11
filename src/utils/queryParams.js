export const createSearchParamsHelper = (filtersParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join('&');
}
