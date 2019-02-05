import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('trainings', {
      params: {
        search: search
      }
    })
  },
  show (trainingId) {
    return Api().get(`trainings/${trainingId}`)
  },
  post (training) {
    return Api().post('trainings', training)
  },
  put (training) {
    return Api().put(`trainings/${training.id}`, training)
  },
  delete (trainingId) {
    return Api().delete(`trainings/${trainingId}`)
  }
}
