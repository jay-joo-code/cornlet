import qs from 'qs';

const getQuery = (location) => {
  return qs.parse(location.search.split('?')[1]);
}

export default getQuery;