export class Validator {
  isStreetAddress(streetAddress){
    const regex = /^(?=\d+(\D|$))(?=([\w\s]{1,100}))\d+\s[A-Za-z\s]+$/;
    return regex.test(streetAddress)
  }
  
  isCity(city){
    const regex = /^[a-zA-Z\s\-.]{0,100}$/
    return regex.test(city)
  }
  
  isEmail(email){
    const regex = /[\w\._]{1,30}@[\w\.\-]+\.[a-z]{2,5}/
    return regex.test(email)
  }
  
  isPostCode(postCode){
    const regex = /^[A-Z0-9\s]{0,15}$/
    return regex.test(postCode)
  }
  
  isCountry(country){
    const regex = /^[a-zA-Z\s\-.]{0,100}$/;
    return regex.test(country)
  }
  
  isName(name){
    const regex = /^[a-zA-Z\s]{0,40}$/;
    return regex.test(name)
  }
}