// Function to fetch data with caching for offline support
export async function fetchWithCache(url: string, cacheTime = 3600000) {
    // Default cache time: 1 hour
    const cacheKey = `cache_${url.split("/").pop()}`
    const cachedData = localStorage.getItem(cacheKey)
  
    // If we're offline, use cached data
    if (!navigator.onLine && cachedData) {
      return JSON.parse(cachedData).data
    }
  
    // If we have cached data that's not expired, use it
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData)
      const isExpired = Date.now() - timestamp > cacheTime
  
      if (!isExpired) {
        return data
      }
    }
  
    try {
      // Fetch fresh data
      const response = await fetch(url)
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
  
      // Cache the data
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          data,
        }),
      )
  
      return data
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
  
      // If fetch fails and we have cached data, use it as fallback
      if (cachedData) {
        return JSON.parse(cachedData).data
      }
  
      throw error
    }
  }
  