import $ from 'jquery-ajax'

class ParksModel {
  static all(){
    let request = $.ajax({
      url: 'https://usnationalparks.firebaseio.com/parks.json',
      dataType: 'json',
      method: 'GET'
    })
    return request
  }
  // static all(){
  //   let request = $.ajax({
  //     url:"http://localhost:8000/",
  //     method: 'GET'
  //   })
  //   return request
  // }
}

export default ParksModel
