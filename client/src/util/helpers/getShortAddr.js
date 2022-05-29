const getShortAddr = (addr) => {
  return addr.split(', NY')[0]
  // return addr.split(', NY')[0].split(', Ithaca')[0]
}

export default getShortAddr
