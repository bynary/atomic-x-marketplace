import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import type { ImxNetworkConfig } from 'types/config.class'
import Config from 'config'
import { Status } from 'types'
import { parseJSON } from 'utils'

interface INetworkState {
  status: Status,
  selected?: ImxNetworkConfig
}

const storage_key = 'selected_network'

let initialState: INetworkState =  {
  status: Status.idle,
  selected: getNetwork(Config.defaultEnvironment)
}

if (localStorage.getItem(storage_key) !== null) {
  const storedState = parseJSON<INetworkState>( localStorage.getItem(storage_key) )
  if(storedState){
    initialState = storedState
  }
}

function getNetwork(name: string){
  let network : ImxNetworkConfig | undefined
  if(Config.imx?.networks.has(name)){
    network = Config.imx.networks.get(name)
  }
  else{
    network = Config.imx?.networks.get(Config.defaultEnvironment)
  }

  return network
}

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetwork(state, action){
      const network = getNetwork(action.payload)
      state.selected = network
      localStorage.setItem(storage_key, JSON.stringify(state))
    }
  }
})

export const selectNetwork = (state: RootState ) => state.network.selected
export const selectIsTest = (state: RootState ) => state.network.selected?.isTest || false
export const networkLocalStorageKey = storage_key

export const { setNetwork } = networkSlice.actions

export default networkSlice.reducer