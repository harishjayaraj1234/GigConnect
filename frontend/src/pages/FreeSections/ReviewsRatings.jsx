import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewsRatings = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    if (userId) {
      fetchReviews();
    } else {
      console.warn("No userId found in localStorage");
      setLoading(false);
    }
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/${userId}`
      );
      setReviews(response.data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  if (!userId) {
    return <p className="text-center text-red-500">User not logged in.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Reviews & Ratings</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        {reviews.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Reviewer</th>
                <th className="py-2">Rating</th>
                <th className="py-2">Review</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    {new Date(rev.date).toLocaleDateString()}
                  </td>
                  <td className="py-2">{rev.reviewerName}</td>
                  <td className="py-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < rev.rating ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </td>
                  <td className="py-2">{rev.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsRatings;
