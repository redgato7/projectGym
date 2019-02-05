import Api from '@/services/Api'

export default {
  index (dietbookmark) {
    return Api().get('dietbookmarks', {
      params: dietbookmark
    })
  },
  post (dietbookmark) {
    return Api().post('dietbookmarks', dietbookmark)
  },
  delete (dietbookmarkId) {
    return Api().delete(`dietbookmarks/${dietbookmarkId}`)
  }
}
