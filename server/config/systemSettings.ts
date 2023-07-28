interface ISystemSetting {
    inviteExpirationTimeInMinutes: number
    getExpiration: () => Date
}

export const systemSettings: ISystemSetting = {
    inviteExpirationTimeInMinutes: 5,
    getExpiration : ()=>new Date((new Date()).getTime() + (systemSettings.inviteExpirationTimeInMinutes * 60000))
}

// Criar a data de expiração
// const currentDate = new Date(); // Data atual
// const expirationDate = new Date(currentDate.getTime() + (systemSettings.inviteExpirationTimeInMinutes * 60000));