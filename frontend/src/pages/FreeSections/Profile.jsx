import { useState, useEffect } from "react";
import axios from "axios";
import EditProfile from "../Auth/EditProfile";

const Profile = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [gigsCompleted, setGigsCompleted] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  
 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/data`, {
          withCredentials: true,
        });


        const completedGig = await axios.get(`${import.meta.env.VITE_API_URL}/booking/all`,{
           withCredentials: true,
        })

        let count = 0;
        completedGig.data.bookings.map((d) => {
          // console.log(d)
          if(d.status == "Completed") count++;  

        })


        if (res.data?.success) {
          const user = res.data.user;
          setName(user.name);
          setEmail(user.email);
          setSkills(user.skills);
          setGigsCompleted(count);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

 const toggleView = () => setShowEdit((prev) => !prev);

   return (
    <div className="p-6">
      {/* 🔄 Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showEdit ? "View Profile" : "Edit Profile"}
        </button>
      </div>

      {/* 👇 Conditional Rendering */}
      {!showEdit ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow space-y-2">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Skills:</strong> {skills}</p>
            <p><strong>Gig's Completed:</strong> {gigsCompleted}</p>
            <p><strong>Rating:</strong> 5 ⭐</p>
          </div>
        </div>
      ) : (
        <EditProfile />
      )}
    </div>
  );
};

export default Profile;
