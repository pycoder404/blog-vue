// fixme  default avatar
const AVATAR = ''
const getters = {
    accessToken: state => state.user.accessToken,
    refreshToken: state => state.user.refreshToken,
    avatar: state => state.user.avatar != '' ? state.user.avatar : AVATAR,
    username: state => state.user.username,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
}
export default getters
