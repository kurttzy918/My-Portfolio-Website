import { initializeApp } from "https://gstatic.com";
import { getFirestore, collection, getDocs } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyCP02-UTGd7zW7oc7Mlc_OVE9gpvjnwu8E",
  authDomain: "://firebaseapp.com",
  projectId: "database-ebd7e",
  storageBucket: "database-ebd7e.firebasestorage.app",
  messagingSenderId: "724637840187",
  appId: "1:724637840187:web:160067b752c43e68197d1e",
  measurementId: "G-J0WR8ZK7SL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getComments() {
  const commentsSection = document.getElementById("comments");
  if (!commentsSection) return;

  try {
    const querySnapshot = await getDocs(collection(db, "comments"));
    
    // Clear section layout and add a header
    commentsSection.innerHTML = `
      <h2 style="text-align: center; margin-bottom: 2rem;">User Comments</h2>
      <div id="comments-wrapper" style="max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;"></div>
    `;
    
    const wrapper = document.getElementById("comments-wrapper");

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Create a clean card layout for each comment entry
      const commentCard = document.createElement("div");
      commentCard.className = "comment-card";
      commentCard.style.cssText = `
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border);
        padding: 1.5rem;
        border-radius: 8px;
      `;
      
      commentCard.innerHTML = `
        <h4 style="margin: 0 0 0.5rem 0; color: #fff;">${data.name || 'Anonymous'}</h4>
        <p style="margin: 0 0 1rem 0; color: var(--text);">${data.message || ''}</p>
        <small style="color: gray; display: block; text-align: right;">
          ${data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString() : ''}
        </small>
      `;
      
      wrapper.appendChild(commentCard);
    });

  } catch (error) {
    commentsSection.innerHTML = `<p style="color: red; text-align: center;">Error loading comments: ${error.message}</p>`;
    console.error("Firestore Error:", error);
  }
}
