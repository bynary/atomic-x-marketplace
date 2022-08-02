interface IPrincipal {
  identityProvider: string,
  userId: string,
  userDetails: string,
  userRoles: string[]
}

export default IPrincipal

