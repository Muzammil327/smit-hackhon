import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../assets/config/firebase-config";
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

export default function Dashboard() {
  const navigate = useNavigate();

  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [namei, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("user:", user);
        setName(user.displayName || "");
        setEmail(user.email || "");
        setMobileNumber(user.phoneNumber || "");
      } else {
        setUser(null);
      }
      setIsLoading(false); // Set loading to false when authentication state is determined
    });

    return () => unsubscribe();
  }, [auth]);
  // When isLoading is true, display a loading indicator
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateUserData = async () => {
    if (!selectedImage) return;

    try {
      const user = auth.currentUser;
      console.log("Value of user:", user);

      // Update display name
      await updateProfile(user, {
        displayName: namei,
      });
      
      
      const storageRef = ref(storage, `users/${user.uid}/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      console.log('Image uploaded successfully.');
      const downloadURL = await getDownloadURL(storageRef);
      console.log('Image uploaded successfully. URL:', downloadURL);


      navigate("/auth/dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      // Handle error if the update fails
      console.error("Error updating user data:", error);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <div className="grid md:grid-cols-2 gap-4 container mx-auto px-12">
        <section className=" py-8">
          <div className="w-full max-w-2xl ml-auto mr-auto mt-8">
            <div className="flex flex-wrap -mx-6 -my-6">
              <div className="w-full px-6 py-6 text-center">
                <div className="bg-slate-100 rounded shadow-lg overflow-hidden p-8">
                {downloadURL && <img src={downloadURL} alt="Uploaded" />}

                  <div className="rounded-full h-64 w-64 flex items-center justify-center bg-grey-light mx-auto mb-8" />
                  <div className="font-bold text-xl mb-2">
                    {user.displayName}
                  </div>
                  <p className="text-grey-darker text-base mb-4">
                    {user.email}
                  </p>

                  <button className="bg-transparent hover:bg-blue text-blue-dark rounded-full font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent "></button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-grey-lightest py-4">
          <div className="w-full px-6 py-6 text-center">
            <div className="w-full bg-slate-200 rounded shadow-lg overflow-hidden p-8">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                    id="grid-first-name"
                    type="text"
                    placeholder={user.displayName}
                    value={namei}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Email{" "}
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="grid-last-name"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={user.email}
                    value={email}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="grid-mobile-number"
                  >
                    Mobile Number
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="grid-mobile-number"
                    type="text"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder={user.phoneNumber}
                    value={mobileNumber}
                  />
                </div>
                <input
                  label="Image"
                  placeholder="Choose image"
                  accept="image/png,image/jpeg"
                  type="file"
                  onChange={handleFileChange}
                />

                <button
                  className="bg-red-300 py-2 px-5 text-black"
                  type="submit"
                  onClick={updateUserData}
                >
                  Updated
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
