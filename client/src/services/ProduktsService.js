import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('produkts', {
      params: {
        search: search
      }
    })
  },
  show (produktId) {
    return Api().get(`produkts/${produktId}`)
  },
  post (produkt) {
    return Api().post('produkts', produkt)
  },
  put (produkt) {
    return Api().put(`produkts/${produkt.id}`, produkt)
  },
  delete (produktId) {
    return Api().delete(`produkts/${produktId}`)
  }
}
