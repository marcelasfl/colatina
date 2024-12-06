// Service/factory.ts
import UseApi from '../../composables/UseApi'
import  api  from '../axios'

export default function serviceFactory(apiUrl: string, listUrl?: string) {
  const { list, post, update, remove, getById } = UseApi(apiUrl)

  let customList;

  if (listUrl) {
    customList = async () => {
      const { data } = await api.get(listUrl)
      return data
    }
  }

  return {
    list: customList || list,
    post,
    update,
    remove,
    getById
  }
}

