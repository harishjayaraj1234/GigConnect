import { useState, useEffect } from "react";
import axios from "axios";
import EditProfile from "../Auth/EditProfile";

const Profile = () => {
  
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [gigsCompleted, setGigsCompleted] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  
 
  const img_url = "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/data`, {
          withCredentials: true,
        });
      
      
        // try {
        const completedGig = await axios.get(`${import.meta.env.VITE_API_URL}/booking/all`, {
          withCredentials: true,
        }); 

        let count = 0;
        completedGig.data.bookings.map((d) => {
  
          if(d.status == "Completed") count++;  
        
        })
        // } catch (error) {

        // }
        
        // console.log('done')
        
        if (res.data?.success) {
          
          
          const user = res.data.user;
          setImage(user.profileImage || "temp")
          setName(user.name);
          setEmail(user.email);
          setSkills(user.skills);
          setGigsCompleted(count);
        }
        console.log(res.data.user.profileImage)
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

 const toggleView = () => setShowEdit((prev) => !prev);

   return (
    <div className="p-6">

      <div className="flex justify-end mb-4">
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showEdit ? "View Profile" : "Edit Profile"}
        </button>
      </div>


      {!showEdit ? (
          <div className="flex items-center justify-center max-h-screen bg-gray-100">
          <div className="flex items-center bg-white p-6 rounded-lg shadow-lg w-[600px] space-x-6">
            
       
            <img
              src={image || img_url}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
            />

     
            <div>
              <h2 className="text-2xl font-semibold mb-3">My Profile</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Skills:</strong> {skills}</p>
                <p><strong>Gig's Completed:</strong> {gigsCompleted}</p>
                <p><strong>Rating:</strong> ⭐ 5</p>
              </div>
            </div>
            
          </div>
        </div>

      ) : (
        <EditProfile />
      )}
    </div>
  );
};

export default Profile;
