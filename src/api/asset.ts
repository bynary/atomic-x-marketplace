// Unfmailiar Online Asset API
import Asset from 'types/asset.class'
import { collections } from 'types/constants'
import { series } from 'types/constants'

const baseUrl = 'https://api.unfamiliar.online/asset/'

const assetApi = {
    getFounderCard: async(foundersCardId: string) => {
        const founderCardEndpoint = baseUrl.concat(`${foundersCardId}`)
        const response = await fetch(founderCardEndpoint);
        const cards = await response.json();
        return cards
    },
    getEquipment: async(equipmentId: string) => {
        const equipmentEndpoint = baseUrl.concat(collections.equipment).concat(`${equipmentId}`)
        const response = await fetch(equipmentEndpoint);
        const cards = await response.json();
        return cards
    },
    getLand: async(landId: string) => {
        const landEndpoint = baseUrl.concat(collections.land).concat(`${landId}`)
        const response = await fetch(landEndpoint);
        const cards = await response.json();
        return cards
    },
    getWell: async(wellId: string) => {
        const wellEndpoint = baseUrl.concat(collections.wells).concat(`${wellId}`)
        const response = await fetch(wellEndpoint);
        const cards = await response.json();
        return cards
    },
    getAssetMetadata: async(asset: Asset) => {
        let response = null

        switch(asset.collection) {
            case series.founder:
                response = assetApi.getFounderCard(asset.id)
                break
            case series.equipment:
                response = assetApi.getEquipment(asset.id)
                break
            case series.land:
                response = assetApi.getLand(asset.id)
                break
            case series.wells:
                response = assetApi.getWell(asset.id)
                break
            default:
                break
        }

        return response
    }
}

export default assetApi