import { BadRequestException } from "@core/Exceptions"

export class FavoriteGroupUserNotBelongGroupError extends BadRequestException {
    constructor(username: string, groupId: string) {
      super(`The user '${username}' does not belong to the group with id '${groupId}' to favorite the group.`)
      this.name = 'FavoriteGroupUserNotBelongGroupError'
    }
}