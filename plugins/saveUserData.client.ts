import { useIndexedDB } from '~/composables/useIndexedDB';

export default defineNuxtPlugin(async () => {
  const { saveUser } = await useIndexedDB();
  const { data } = useAuth();

  if (data.value?.user) {
    try {
      const sanitizedUsername = sanitizeUsername(data.value.user.email);

      const user = {
        id: data.value.user.email,
        name: data.value.user.name,
        email: data.value.user.email,
        picture: data.value.user.image,
        sanitizedUsername: sanitizedUsername,
      };

      await saveUser(user);
    } catch (error) {
      console.error("Error during user saving process:", error);
    }
  } else {
    console.error("No user data found in the auth data.");
  }
});

// Move to utils later
function sanitizeUsername(email: string): string {
  return email.replace(/[@.]/g, '-');
}