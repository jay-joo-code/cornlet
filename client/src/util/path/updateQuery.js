import qs from 'qs';

const updateQuery = (query, location, history) => {
  const prevQuery = qs.parse(location.search.split('?')[1]);
  const newQuery = Object.assign({}, prevQuery, query);
  const queryStr = qs.stringify(newQuery);
  const newPath = `${location.pathname}?${queryStr}`;
  history.push(newPath);
}

export default updateQuery;