export const load = (key:string) => {
    if (!key) {
      return null
    }
  
    try {
      const item = localStorage.getItem(key)

      if (!item) return null
      // return encryption.decrypt(JSON.parse(item));
      console.log('kkk', JSON.parse(item))
      return JSON.parse(item)
    } catch (e) {
      console.log(e)
      return null
    }
  }
  
  export const save = (key:string, value:string) => {
    if (!key || !value) {
      return null
    }
  
    try {
      return localStorage.setItem(key, value)
    } catch (e) {
      return null
    }
  }
  
  export const remove = (key:string) => {
    if (!key) {
      return null
    }
  
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      return null
    }
  }
  
  export const encryptAndSave = (key:string, value:string) => {
    if (!key) {
      return null
    }
  
    try {
      // const encryptedValue = encryption.encrypt(value);
      const encryptedValue = value
      save(key, `${encryptedValue}`)
      return true
    } catch (e) {
      console.log('e', e)
      return null
    }
  }
  
 
  