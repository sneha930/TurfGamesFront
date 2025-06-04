export const getCurrentUser = () => {
   try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
   } catch(error) {
      return null;
   }
}