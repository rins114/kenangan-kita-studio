const paginate = (data, currentPage = 1, perPage = 10) => {
  if (!Array.isArray(data)) {
    throw new Error("Data harus berupa array");
  }
  console.log(data);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  const startIndex = (validPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    currentPage: validPage,
    perPage,
    totalItems,
    totalPages,
    data: paginatedData,
  };
};

export default paginate;
