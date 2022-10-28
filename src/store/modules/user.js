const sessionStoarge = {
  getIdFromEmail() {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const id = user.email.split("@")[0];
      return `${id}님 안녕하세요😀`;
    }
    return "로그인을 해주세요.";
  },
};

export default {
  namespaced: true,
  state: {
    user: {
      userId: sessionStoarge.getIdFromEmail(),
    },
  },

};
