export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return null;

    return {
      ...user,
      role: user.role?.replace("ROLE_", "")
    };
  } catch (error) {
    return null;
  }
};
