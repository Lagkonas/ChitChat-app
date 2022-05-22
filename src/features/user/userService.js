import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../../firebase.config';

const auth = getAuth();

const signUp = async (userData) => {
  const { email, password, name } = userData;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  const { displayName: userName, email: userEmail, uid } = user;
  const userInfo = {
    id: uid,
    userName,
    userEmail,
  };

  const userDataCopy = { ...userData };
  delete userDataCopy.password;
  userDataCopy.timestamp = serverTimestamp();
  await setDoc(doc(db, 'users', user.uid), userDataCopy);
  await updateProfile(auth.currentUser, { displayName: name });

  if (userInfo) {
    localStorage.setItem('authUser', JSON.stringify(userInfo));
  }
  return userInfo;
};

const login = async (userData) => {
  const { email, password } = userData;

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const { displayName: userName, email: userEmail} = userCredential.user;
  const userInfo = {
    userName,
    userEmail,
  };

  if (userInfo) {
    localStorage.setItem('authUser', JSON.stringify(userInfo));
  }
  return userInfo;
};

const logout = async () => {
  await signOut(auth);
  localStorage.clear();
};

const getUsers = async () => {
    const usersRef = collection(db, 'users');
    const docSnap = await getDocs(usersRef);

    const users = [];

    docSnap.forEach((doc) => {
      return users.push({
        data: doc.data(),
      });
    })
    
    users.map(element => {
        return delete element.data.timestamp
    })
    
    return users
};

const userService = {
  signUp,
  login,
  logout,
  getUsers,
};

export default userService;
