import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('diethistories', {
      params: params
    })
  },
  post (diethistorie) {
    return Api().post('diethistories', diethistorie)
  }
}
