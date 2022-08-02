class ImxNetworkConfig{
  linkAddress?: string
  apiAddress?: string
  contractAddress?: string
  equipmentContractAddress?: string
  landContractAddress?: string
  wellsContractAddress?: string
  marketplaceUrl?: string
  isTest: boolean
}

interface ImxConfig {
  networks: Map<string, ImxNetworkConfig>
}

interface ApplicationConfig {
  title: string,
  company: string,
  companyUrl?: string,
  defaultEnvironment: string,
  loginPath: string,
  logoutPath: string,
  profilePath: string,
  imx?: ImxConfig
}

export type { ImxNetworkConfig }
export type { ImxConfig }

export default ApplicationConfig