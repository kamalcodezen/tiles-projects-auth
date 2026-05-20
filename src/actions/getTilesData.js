// all data fetch
export const getAllTilesData = async () => {
    const res = await fetch("https://tiles-projects-auth.vercel.app/tiles-data.json")
    const data = await res.json()
    return data.tiles
}

// single data fetch
export const getSingleTileData = async (id) => {
    const res = await fetch("https://tiles-projects-auth.vercel.app/tiles-data.json", { next: { revalidate: 30 } })
    const allData = await res.json()
    const foundData = allData.find(tiles => tiles.id == id)
    return foundData
}


// filter data

export const getFilterTilesData = async (keyword) => {
    const allData = await getAllTilesData()

    const filterTiles = allData.filter(tiles => tiles.title.toLowerCase().includes(keyword.toLowerCase()));
    return filterTiles;
}