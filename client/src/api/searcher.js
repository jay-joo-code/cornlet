import useCustomQuery from 'src/hooks/useCustomQuery'

export const searchersQueryConfig = (params = {}) => ({
  url: `/chatroom/listing/searchers/${params.listingId}`,
  variables: params,
})

export const useSearchers = (params) => {
  const { data: searchers, ...rest } = useCustomQuery(searchersQueryConfig(params))

  return {
    ...rest,
    searchers,
  }
}
