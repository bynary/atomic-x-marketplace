// Atomic-X Asset Interface
interface IAsset{
  id: string,
  collection: string
}

// Atomic-X Asset implementation
class Asset implements IAsset{
  id: string
  collection: string

  constructor(id: string, collection: string){
    this.id = id
    this.collection = collection
  }
}

export default Asset