import formatDate from './formatDate';

const listingDatestring = (listing) => {
	if (!listing || !listing.start || !listing.end) return '';
	return formatDate(listing.start) + ' ~ ' + formatDate(listing.end);
}

export default listingDatestring;