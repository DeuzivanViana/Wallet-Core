export const WalletService = {
  async getCurrentWallet() {
    const response = await fetch('http://192.168.1.102:3001/api/v1/wallet', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })

    const data = await response.json()

    return { data, response }
  }
}