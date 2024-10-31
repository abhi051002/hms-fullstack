import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/*---------- Doctor : Name,degree,experience------------- */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-sm rounded-full border-zinc-600 cursor-text">
                {profileData.experience}
              </button>
            </div>

            {/* ------------------ Doctor About------------------------ */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee :{" "}
              <span className="text-gray-800">
                {currency}
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fee}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fee: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData.fee
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p className="font-medium">Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                id="available"
              />
              <label htmlFor="available">Available</label>
            </div>
            {!isEdit ? (
              <button
                className="px-4 py-1 border border-primary text-md rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            ) : (
              <button
                className="px-4 py-1 border border-primary text-md rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                onClick={updateProfile}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
