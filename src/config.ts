import ApplicationConfig from 'types/config.class'

const config : ApplicationConfig = {
   title :  process.env.REACT_APP_TITLE || 'NFT Marketplace',
   company:  process.env.REACT_APP_COMPANY || 'Company Name',
   companyUrl:  process.env.REACT_APP_COMPANY_URL || 'https://localhost',
   defaultEnvironment: process.env.REACT_APP_DEFAULT_ENVIRONMENT || 'test',
   loginPath: '/.auth/login/aad',
   logoutPath: '/.auth/logout',
   profilePath: '/.auth/me',
   imx: {
     networks: new Map([
       ['production', {
        isTest: false,
        linkAddress: process.env.REACT_APP_IMX_LINK_ADDRESS,
        apiAddress: process.env.REACT_APP_IMX_API_ADDRESS,
        contractAddress: process.env.REACT_APP_IMX_CONTRACT_ADDRESS,
        equipmentContractAddress: process.env.REACT_APP_IMX_EQUIPMENT_CONTRACT_ADDRESS,
        landContractAddress: process.env.REACT_APP_IMX_LAND_CONTRACT_ADDRESS,
        wellsContractAddress: process.env.REACT_APP_IMX_WELLS_CONTRACT_ADDRESS,
        marketplaceUrl: process.env.REACT_APP_IMX_MARKETPLACE_URL
       }],
       ['test', {
        isTest: true,
        linkAddress: process.env.REACT_APP_IMX_TEST_LINK_ADDRESS,
        apiAddress: process.env.REACT_APP_IMX_TEST_API_ADDRESS,
        contractAddress: process.env.REACT_APP_IMX_TEST_CONTRACT_ADDRESS,
        equipmentContractAddress: process.env.REACT_APP_IMX_TEST_EQUIPMENT_CONTRACT_ADDRESS,
        landContractAddress: process.env.REACT_APP_IMX_TEST_LAND_CONTRACT_ADDRESS,
        wellsContractAddress: process.env.REACT_APP_IMX_TEST_WELLS_CONTRACT_ADDRESS,
        marketplaceUrl: process.env.REACT_APP_IMX_TEST_MARKETPLACE_URL
       }]
     ])
   }
}

export default config