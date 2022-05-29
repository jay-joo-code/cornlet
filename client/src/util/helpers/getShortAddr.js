const getShortAddr = (addr) => {
  return addr.split(', NY')[0]
}

export default getShortAddr
