import api from '../api.ts'

export default function resolucaoService() {
  const list = async () => {
    const response = await api.get('/modalidadebolsa/resolucao')
    return response.data
  }

  return { list }
}
