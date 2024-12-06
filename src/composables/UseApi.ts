import api from '../services/axios'

export default function useApi(url: string) {
  const list = async () => {
    const { data } = await api.get(url)
    return data
  }

  const getById = async (id: string) => {
    const response = await api.get(`${url}/${id}`)
    return response.data.value
  }

  const post = async (form: string) => {
    const { data } = await api.post(url, form)
    return data
  }

  const update = async (form: { Id: string }) => {
    const { data } = await api.put(`${url}/${form.Id}`, form)
    console.log(data)
    return data
  }

  const remove = async (id: string) => {
    const { data } = await api.delete(`${url}/${id}`)
    return data
  }

  return {
    list,
    post,
    update,
    remove,
    getById,
  }
}
