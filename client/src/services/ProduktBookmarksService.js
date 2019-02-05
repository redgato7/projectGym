import Api from '@/services/Api'

export default {
  index (produktbookmark) {
    return Api().get('produktbookmarks', {
      params: produktbookmark
    })
  },
  post (produktbookmark) {
    return Api().post('produktbookmarks', produktbookmark)
  },
  delete (produktbookmarkId) {
    return Api().delete(`produktbookmarks/${produktbookmarkId}`)
  }
}
