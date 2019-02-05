import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('traininghistories', {
      params: params
    })
  },
  post (traininghistorie) {
    return Api().post('traininghistories', traininghistorie)
  },
  delete (traininghistorieId) {
    return Api().delete(`traininghistories/${traininghistorieId}`)
  }
}
