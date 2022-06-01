import { useQuery } from 'react-query'
import apiV2 from 'src/util/apiV2'

const useCustomQuery = ({ url, variables, options }) => {
  return useQuery({
    queryKey: [url, variables],
    queryFn: () =>
      new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const data = await apiV2.get(url, variables)
            resolve(data)
          } catch (error) {
            reject(error)
          }
        })()
      }),

    // default options
    refetchOnWindowFocus: false,
    refetchOnMount: false,

    // override default options
    ...options,
  })
}

export default useCustomQuery
