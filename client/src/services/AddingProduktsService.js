import Api from '@/services/Api'

export default {
  index (addingprodukt) {
    return Api().get('addingprodukts', {
      params: addingprodukt
    })
  },
  show (addingproduktId) {
    return Api().get(`addingprodukts/${addingproduktId}`)
  },
  post (addingprodukt) {
    return Api().post('addingprodukts', addingprodukt)
  },
  put (addingprodukt) {
    return Api().put(`addingprodukts/${addingprodukt.id}`, addingprodukt)
  },
  delete (addingproduktId) {
    return Api().delete(`addingprodukts/${addingproduktId}`)
  }
}
