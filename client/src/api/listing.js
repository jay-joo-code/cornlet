import queryString from 'query-string'
import useCustomQuery from 'src/hooks/useCustomQuery'

export const listingsQueryConfig = (params = {}) => ({
  url: `/listing`,
  variables: params,
})

export const useListings = (params) => {
  const { data, ...rest } = useCustomQuery(listingsQueryConfig(params))

  return {
    ...rest,
    ...data,
    listings: data ? data.docs : [],
  }
}

export const userListingsQueryConfig = (params = {}) => ({
  url: `/user/${params.uid}/listings`,
  variables: params,
})

export const useUserListings = (params) => {
  const { data: listings, ...rest } = useCustomQuery(userListingsQueryConfig(params))

  return {
    ...rest,
    listings,
  }
}

export const listingDetailsQueryConfig = (params = {}) => ({
  url: `/listing/${params.listingId}`,
  variables: params,
})

export const useListingDetails = (params) => {
  const { data: listing, ...rest } = useCustomQuery(listingDetailsQueryConfig(params))

  return {
    ...rest,
    listing,
  }
}

export const listingStatsQueryConfig = (params = {}) => ({
  url: `/listing/${params.listingId}/stats`,
  variables: params,
})

export const useListingStats = (params) => {
  const { data: stats, ...rest } = useCustomQuery(listingStatsQueryConfig(params))

  return {
    ...rest,
    stats,
  }
}

// export const useIncrementEventViews = () => {
//   const {
//     mutate: incrementEventViews,
//     mutateAsync: incrementEventViewsAsync,
//     ...rest
//   } = useCustomMutation<IEvent, { _id: string }>({
//     url: '/public/event/increment-views',
//     method: 'post',
//   })

//   return {
//     ...rest,
//     incrementEventViews,
//     incrementEventViewsAsync,
//   }
// }
