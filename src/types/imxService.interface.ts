import { Link, ImmutableXClient } from '@imtbl/imx-sdk'

interface IImxService{
  link:Link
  client:ImmutableXClient
}

class ImxService implements IImxService{
  link:Link
  client:ImmutableXClient

  constructor(link: Link, client:ImmutableXClient){
    this.link = link
    this.client = client
  }
}

export default ImxService