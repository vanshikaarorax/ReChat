import { create } from 'zustand';
import { doc } from 'firebase/firestore'; // Import doc from 'firebase/firestore'
import { db } from './firebase';
import { getDoc } from 'firebase/firestore';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: async (chatId, user) => { // Corrected the function name to changeChat
    const currentUser = useUserStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED
    if (user.blocked.includes(currentUser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if receiver is blocked
    else if (currentUser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }else{
        return set({
            chatId,
            user,
            isCurrentUserBlocked:false,
            isReceiverBlocked:false,
            
        });
    }
  }, // Removed the unnecessary comma after the function definition

  changeBlock: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked,
    }));
  }, // Added a missing closing parenthesis for set function call

  // CHECK IF RECEIVER IS BLOCKED
}));
