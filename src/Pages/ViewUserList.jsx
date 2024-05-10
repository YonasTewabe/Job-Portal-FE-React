/* eslint-disable react-refresh/only-export-components */
import axios from "../axiosInterceptor";
import { useEffect, useState } from "react";
import withAuth from "../withAuth";
import Spinner from "../Components/Spinner";
import UnauthorizedAccess from "../Components/UnauthorizedAccess";

const ViewHrList = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const myRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesResponse] = await Promise.all([
          axios.get(`/api/profile/all`),
        ]);

        const profilesData = profilesResponse.data;

        const filteredProfiles = profilesData.filter(
          (profile) => profile.role === "user"
        );

        setProfiles(filteredProfiles);
      } catch (error) {
        console.error("Error fetching application data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedProfiles = profiles.slice().sort((a, b) => {
    if (sortKey && sortOrder) {
      const comparison = a[sortKey].localeCompare(b[sortKey]);
      return sortOrder === "asc" ? comparison : -comparison;
    }
    return 0;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <br />
      {myRole === "admin" ? (
        <div className="bg-indigo-100 py-10">
          <div className="w-full bg-white shadow-md rounded">
            <br />
            <h1 className="text-indigo-700 text-3xl items-center text-center">
              Registered Users
            </h1>
            <div className="container mx-auto py-10 px-6">
              {profiles.length > 0 ? (
                <table className="border-collapse border border-gray-800 w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-800 px-4 py-2" onClick={() => handleSort("fullname")} style={{ position: "relative", cursor: "pointer" }}>
                        Full Name {sortKey === "fullname" && sortOrder !== null && (sortOrder === "asc" ? <span style={{ position: "absolute", right: "5px", top: "3px" }}>▲</span> : <span style={{ position: "absolute", right: "5px", top: "3px" }}>▼</span>)}
                      </th>
                      <th className="border border-gray-800 px-4 py-2" onClick={() => handleSort("age")} style={{ position: "relative", cursor: "pointer" }}>
                        Age {sortKey === "age" && sortOrder !== null && (sortOrder === "asc" ? <span style={{ position: "absolute", right: "5px", top: "3px" }}>▲</span> : <span style={{ position: "absolute", right: "5px", top: "3px" }}>▼</span>)}
                      </th>
                      <th className="border border-gray-800 px-4 py-2" onClick={() => handleSort("sex")} style={{ position: "relative", cursor: "pointer" }}>
                        Sex {sortKey === "sex" && sortOrder !== null && (sortOrder === "asc" ? <span style={{ position: "absolute", right: "5px", top: "3px" }}>▲</span> : <span style={{ position: "absolute", right: "5px", top: "3px" }}>▼</span>)}
                      </th>
                      <th className="border border-gray-800 px-4 py-2" onClick={() => handleSort("degree")} style={{ position: "relative", cursor: "pointer" }}>
                        Education {sortKey === "degree" && sortOrder !== null && (sortOrder === "asc" ? <span style={{ position: "absolute", right: "5px", top: "3px" }}>▲</span> : <span style={{ position: "absolute", right: "5px", top: "3px" }}>▼</span>)}
                      </th>
                      <th className="border border-gray-800 px-4 py-2" onClick={() => handleSort("university")} style={{ position: "relative", cursor: "pointer" }}>
                        University {sortKey === "university" && sortOrder !== null && (sortOrder === "asc" ? <span style={{ position: "absolute", right: "5px", top: "3px" }}>▲</span> : <span style={{ position: "absolute", right: "5px", top: "3px" }}>▼</span>)}
                      </th>
                      <th className="border border-gray-800 px-4 py-2" onClick={() => handleSort("experience")} style={{ position: "relative", cursor: "pointer" }}>
                        Experience {sortKey === "experience" && sortOrder !== null && (sortOrder === "asc" ? <span style={{ position: "absolute", right: "5px", top: "3px" }}>▲</span> : <span style={{ position: "absolute", right: "5px", top: "3px" }}>▼</span>)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProfiles.map((profile, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-indigo-100" : ""}
                      >
                        <td className="border border-gray-800 px-4 py-2">
                          {profile.fullname}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {profile.age}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {profile.sex}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {profile.degree}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {profile.university}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {profile.experience}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="container bg-blue-50 mx-auto py-10 px-6">
                  <p>No registered Users</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <UnauthorizedAccess />
      )}
    </>
  );
};

export default withAuth(ViewHrList);
