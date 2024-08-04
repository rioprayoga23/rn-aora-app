import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
};

const client = new Client(client);

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const avatar = new Avatars(client);
const account = new Account(client);
const database = new Databases(client);

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(username);

    await signIn({ email, password });

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    // const session = await account.createEmailPasswordSession(email, password);
    // return session;
    // await account.deleteSessions();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAccount = async () => {
  try {
    const currentUser = await account.get();
    return currentUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getAllPosts() {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
