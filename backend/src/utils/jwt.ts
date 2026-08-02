import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua_chave_super_secreta_aqui'
)

export interface AppJwtPayload extends JWTPayload {
  id: string
}

export const JwtProvider = {
  async sign(payload: JWTPayload, expiresIn: string = '7d') {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(SECRET_KEY)

    return token
  },

  async verify(token: string): Promise<AppJwtPayload | null> {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY)
      return payload as AppJwtPayload
    } catch (error) {
      return null 
    }
  }
}