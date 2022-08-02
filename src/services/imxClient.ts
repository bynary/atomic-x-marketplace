import { Link, ImmutableXClient } from '@imtbl/imx-sdk'
import { store } from 'store'
import { selectNetwork } from 'store/network/networkSlice'
import { ImxService } from 'types'

const build = async ():Promise<ImxService> => {

  const network = selectNetwork(store.getState())

  const linkAddress = network?.linkAddress
  const apiAddress = network?.apiAddress || ''

  const link = new Link(linkAddress);
  const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
  
  const svc = { link, client }

  return svc
}

export default build