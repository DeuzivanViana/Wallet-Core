export const UserService = {
  async getCurrentUser() {
    const response = await fetch('http://192.168.1.103:3001/api/v1/user', {
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