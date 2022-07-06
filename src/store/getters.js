const getters = {
    accessToken: state => state.user.accessToken,
    refreshToken: state => state.user.refreshToken,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
}
export default getters
