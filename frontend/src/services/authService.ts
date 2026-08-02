type SignInProps = {
  username: string | any,
  password: string | any
}

type SignUpProps = {
  username: string | any,
  password: string | any
}

export const AuthService = {
  async signIn(props: SignInProps) {
    const response = await fetch('http://192.168.1.103:3001/api/v1/auth/sign-in', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        username: props.username,
        password: props.password
      })
    })
    
    const data = await response.json()
    
    return data
  },
  async signUp(props: SignUpProps) {
     const response = await fetch('http://192.168.1.103:3001/api/v1/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        username: props.username,
        displayName: props.username,
        password: props.password
      })
    })

    const data = await response.json()

    return data
  }
}