interface IPage {
    key: number
    value: string
}

class Page implements IPage{
    key: number
    value: string
  
    constructor(id: number, value: string){
      this.key = id
      this.value = value
    }
  }

export default Page