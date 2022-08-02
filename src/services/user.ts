import imx from './imxClient'
import Config from 'config'
import { User, IPrincipal } from 'types/index'

const USER_KEY = 'USER'

const getUserPrincipal = async() => {
  try{
    const response = await fetch(Config.profilePath);
    const payload = await response.json();
    const { clientPrincipal } = payload;
    return clientPrincipal;
  }
  catch(e){
    return null
  }
}

const service = {
  getPrincipal: async(): Promise<IPrincipal | null> => {
    return getUserPrincipal()
  },
  getUser: async(): Promise<User> => {
    let user = new User(null, null)

    const userJson = localStorage.getItem(USER_KEY)
    
    if(userJson){
      const parsed = JSON.parse(userJson)
      user = new User(parsed.walletAddress, parsed.starkPublicKey)
    }

    let principal = await getUserPrincipal()
    if(principal){
      user.isAuthenticated = true
      user.principal = principal
    }

    return user
  },

  connectWallet: async(): Promise<User> => {
    const svc = await imx()

    const {address, starkPublicKey} = await svc.link.setup({})
    console.log("no wallet: ", "no wallet connected")

    const user = new User(address, starkPublicKey)

    localStorage.setItem(USER_KEY, JSON.stringify(user))
    
    return user
  },

  disconnectWallet: () => {
    localStorage.removeItem(USER_KEY);
  }
}

export default service
