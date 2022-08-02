const collections = {
    founder: '',
    equipment: 'equipment/',
    land: 'land/',
    wells: 'wells/'
}

const cityNames = ['Builder\'s Keep']

const citySizes = ['Small', 'Medium', 'Large']

const factions = ['Talhainn', 'Clochenraith']

const islands = ['Nua', 'Carnage', 'Ishka']

const series = {
    founder: 'Unfamiliar Territory - Founder',
    equipment: 'UFT Equipment',
    land: 'Unfamiliar Territory Land',
    wells: 'UFT Wells'
}

// Plot Types
interface Plot {
    name: string
    sub_types: string[]
}

const plot_types: Plot[] = [
{
    name: 'City',
    sub_types: ['Food', 'Stone', 'Wood']
},
{
    name: 'Resource',
    sub_types: ['Food', 'Stone', 'Wood']
},
{
    name: 'Transportation',
    sub_types: ['Air Dock', 'Stable', 'Wharf']
}]

export type { Plot }
export { cityNames, citySizes, collections, factions, islands, series, plot_types }