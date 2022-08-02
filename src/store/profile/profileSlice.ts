import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BigNumber } from 'ethers'
import type { RootState } from 'store'
import ImxClient from 'services/imxClient'
import UserService from 'services/user'
import  { User, Status } from 'types'
import { ImmutableAssetStatus } from '@imtbl/imx-sdk'

interface ProfileState {
  status: Status,
  user?: User|null,
  error?: string,
  imxBalance: BigNumber|null
}

const initialState: ProfileState = {
  status: Status.idle,
  user: null,
  imxBalance: null
}

const GetIsFounder = async (user: User) => {
  const imx = await ImxClient()
  
  let assetCursor
  let remaining = 0
  let results: any[] = []
  let response = {
    // TODO: Change to false prior to release
    isFounder: false
  }

  do {
    try{
      let assetResponse: any = await imx.client.getAssets(
        {
          user: user?.walletAddress || '', 
          cursor: assetCursor, 
          status: ImmutableAssetStatus.imx, 
          sell_orders: true 
        })
      results = results.concat(assetResponse.result)
      assetCursor = assetResponse.cursor
      remaining = assetResponse.remaining
    }
    catch(e){
      assetCursor = false
    }

    console.log('got assets...determining founder status...')
    for(let asset of results){
      if (asset.metadata && asset.metadata.series && asset.metadata.series === "Founder"){
        if(asset.metadata.name && asset.metadata.name !== "Leather Knapsack"){
          response.isFounder = true
          remaining = 0
          
          console.log('Determined founder status...user is founder')
          break
        }
      }  
      
      console.log('Determined founder status...user is not founder')
    }
  } while (remaining > 0)

  return response
}

//thunks
export const fetchUser = createAsyncThunk('profile/fetchUser', async () => {
  const user = await UserService.getUser()
  return user
})

export const connectWallet = createAsyncThunk('profile/connectWallet', async() => {
  const user = await UserService.connectWallet()
  return user
})

// thunks
export const init = createAsyncThunk('profile/init', async(_, thunkApi) => {
  const user = await UserService.getUser()
  let balance: BigNumber|null = null
  let isFounder: boolean = false

  if(user && user.walletAddress){
    const imx = await ImxClient()
    const wallet = user.walletAddress ?? ''
  
    //@ts-ignore
    const getBalanceResponse = await imx.client.getBalance({user: wallet, tokenAddress: 'eth'})
    
    balance = getBalanceResponse.balance as BigNumber
    isFounder = (await GetIsFounder(user)).isFounder
  }

  return { user, balance, isFounder }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setImxBalance(state, action){
      return {
        ...state,
        imxBalance: action.payload
      }
    },
    disconnectWallet(state){
      if(state.user){
        const disconnectedUser = {
          walletAddress: null,
          starkPublicKey: null,
          isConnected:false,
          isAuthenticated: state.user.isAuthenticated,
          isFounder: false
        }

        return {
          ...state,
          user: disconnectedUser
        }
      }

      return state
    },
    setIsFounder(state, action){
      if(state.user){
        const isFounderUser = {
          ...state.user,
          isFounder: action.payload
        }

        return {
          ...state,
          user: isFounderUser
        }
      }
      
      return state
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = Status.loading
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = Status.succeeded
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = Status.failed
        state.error = action.error.message
      })
      .addCase(connectWallet.pending, (state) => {
        state.status = Status.loading
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.status = Status.idle
        state.user = action.payload
      })      
      .addCase(init.rejected, (state, action) =>{
        state.status = Status.failed
        state.error = action.error.message
      })
      .addCase(init.pending, (state) =>{
        state.status = Status.loading
      })
      .addCase(init.fulfilled, (state, action) =>{
        state.status = Status.succeeded
        state.user = action.payload.user
        state.imxBalance = action.payload.balance
        state.user.isFounder = action.payload.isFounder
      })
  }
})

export const selectUser = (state: RootState) => state.profile.user  || null
export const selectStatus = (state: RootState) => state.profile.status

export const selectIsConnected = (state:RootState) => state.profile.user && state.profile.user.isConnected
export const selectIsAuthenticated = (state:RootState) => state.profile.user && state.profile.user.principal != null
export const selectIsFounder = (state:RootState) => state.profile.user && state.profile.user.isFounder
export const selectImxBalance = (state:RootState) => state.profile.imxBalance

export const { disconnectWallet, setImxBalance, setIsFounder } = profileSlice.actions

export default profileSlice.reducer