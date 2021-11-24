const formatListingDesc = (listing) => {
  return `${listing.availRooms || '1'} ${listing.availRooms > 1 ? 'rooms' : 'room'} in a ${
    listing.totalRooms || 1
  }-BR ${listing.type.charAt(0).toUpperCase() + listing.type.slice(1)}`
}

export default formatListingDesc
