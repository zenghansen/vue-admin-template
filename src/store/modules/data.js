export default {
  state: {
    xAxisData:['2012', '2013', '2014', '2015', '2016']
  },
  getters: {
    getxAxisData: state => state.xAxisData
  },
  mutations: {
    setxAxisData(state, xAxisData){
      state.xAxisData = xAxisData
    }
  }
}
