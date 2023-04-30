export const mockFirebase = {
    auth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(),
      currentUser: {
        uid: "mock-uid",
      },
    })),
    signOut: jest.fn(),
  };