import LandMetadataConfig from 'types/metadata.class'
// import { factions, islands } from 'types/constants'

const config : LandMetadataConfig = {
    collection: new Map([
        ['land', {
            plot_type: '',
            plot_sub_type: '',
            coordinates: '',
            collection_id: '',
            city_size: '',
            city_name: '',
            name: '',
            description: '',
            category: '',
            image_url: '',
            series: '',
            faction: '',
            island: ''
        }]
    ])
}

export default config