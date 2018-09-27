const appRoot = require('app-root-path');
const _ = require('lodash');

const { paginatedLink } = appRoot.require('/serializers/uri-builder');

/**
 * @summary Paginate data rows
 * @function
 * @param {[Object]} rows Data rows
 * @param {Object} page Pagination query parameter
 * @returns {*} Paginated data rows and pagination links
 */
const paginate = (rows, page) => {
  const { number, size } = page;
  const pageNumber = parseInt(number, 10);
  const pageSize = size ? parseInt(size, 10) : 10;
  const nextPage = pageNumber + 1;
  const prevPage = pageNumber - 1;
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = _.slice(rows, (pageNumber - 1) * pageSize, pageNumber * pageSize);
  const isOutOfBounds = pageNumber < 1 || pageNumber > totalPages;

  const paginationLinks = {
    first: paginatedLink(pageNumber, pageSize),
    last: paginatedLink(totalPages, pageSize),
    next: isOutOfBounds || nextPage > totalPages ? null : paginatedLink(nextPage, pageSize),
    prev: isOutOfBounds || prevPage < 1 ? null : paginatedLink(prevPage, pageSize),
  };

  return { paginatedRows, paginationLinks };
};

module.exports = { paginate };
