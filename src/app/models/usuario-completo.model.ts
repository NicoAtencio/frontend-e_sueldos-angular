export interface IUsuarioCompleto {
    user: {
        name: string,
        email: string,
        role: string,
        isEmailVerified: boolean,
        id: string
    },
    tokens: {
        access: {
            token: string,
            expires: Date
        },
        refresh: {
            token: string,
            expires: Date
        }
    }
}