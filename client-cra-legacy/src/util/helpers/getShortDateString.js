import formatDate from 'src/util/helpers/formatDate';

const getShortDateString = (listing) => {
  const { start, end } = listing;
  return `${formatDate(new Date(start), true)} - ${formatDate(new Date(end), true)}`;
}

export default getShortDateString
