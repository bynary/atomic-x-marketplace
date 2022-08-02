import IPrincipal from './principal.interface'

interface IUser{
  walletAddress?: string | null,
  starkPublicKey?: string | null,
  isConnected: boolean,
  isAuthenticated: boolean,
  isFounder: boolean
}

class User implements IUser{
  principal?: IPrincipal
  walletAddress?: string | null
  starkPublicKey?: string | null
  isConnected: boolean
  isAuthenticated: boolean
  isFounder: boolean

  constructor(wallet: string|null, starkPublicKey: string|null){
    this.walletAddress = wallet
    this.starkPublicKey = starkPublicKey
    this.isConnected = wallet !== null && wallet !== undefined
    this.isAuthenticated = false
    this.isFounder = false
  }
}

export default User