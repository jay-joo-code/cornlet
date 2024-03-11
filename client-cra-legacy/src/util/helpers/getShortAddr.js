const getShortAddr = (addr) => {
	return addr.split(', Ithaca')[0]
}

export default getShortAddr;