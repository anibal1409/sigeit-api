export const JWT_CONST = {
  /**
   * Clave para firmar y verificar los JWT. Se lee de `JWT_SECRET` al usarse
   * (no al importar), porque las variables de entorno se cargan después.
   * Sin ella la aplicación no arranca: una clave fija permitiría falsificar tokens.
   */
  get secret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined.');
    }
    return secret;
  },
  /**
   * El tiempo que pasara para que el token expire
   */
  expiresIn: '14400s',
};
