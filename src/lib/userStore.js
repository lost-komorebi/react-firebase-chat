import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      // get userinfo from firebase
      // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      // set current user and clear loading if can get userinfo
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        // set current user as null and also need to clear loading even if no user info
        set({ currentUser: null, isLoading: false });
      }
    } catch (e) {
      console.log(e);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
