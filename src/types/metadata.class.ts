class LandMetadata {
  collection_id: string
  plot_type: string
  plot_sub_type: string
  coordinates: string
  city_size: string
  city_name: string
  name: string
  series: string
  faction: string
  island: string
}

interface LandMetadataConfig {
  collection: Map<string, LandMetadata>
}

export type { LandMetadata }

export default LandMetadataConfig