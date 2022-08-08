/* ------------------------------------------
    Helper functions for getting collection
    images and metadata
  ------------------------------------------ */
const collectionApi = {
    getMetadata: async(url: string) => {
        const response = await fetch(url);
        const cards = await response.json();
        return cards
    }
}

export default collectionApi