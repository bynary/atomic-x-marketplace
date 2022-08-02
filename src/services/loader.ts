import UserService from 'services/user'

const load = async ():Promise<any> => {
 
  const user = await UserService.getUser()

  return {
    wallet: {
      user: user
    }
  }
}

const service = {
  load
}

export default service