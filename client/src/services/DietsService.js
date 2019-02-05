import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('diets', {
      params: {
        search: search
      }
    })
  },
  show (dietId) {
    return Api().get(`diets/${dietId}`)
  },
  post (diet) {
    return Api().post('diets', diet)
  },
  put (diet) {
    return Api().put(`diets/${diet.id}`, diet)
  },
  delete (dietId) {
    return Api().delete(`diets/${dietId}`)
  }
}
