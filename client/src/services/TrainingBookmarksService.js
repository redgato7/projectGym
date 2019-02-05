import Api from '@/services/Api'

export default {
  index (trainingbookmark) {
    return Api().get('trainingbookmarks', {
      params: trainingbookmark
    })
  },
  post (trainingbookmark) {
    return Api().post('trainingbookmarks', trainingbookmark)
  },
  delete (trainingbookmarkId) {
    return Api().delete(`trainingbookmarks/${trainingbookmarkId}`)
  }
}
