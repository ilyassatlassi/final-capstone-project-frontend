import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../redux/slices/doctors';
import DeleteDoctor from '../components/DeleteDoctor';

const DeleteDoctorPage = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">List of Doctors</h1>
      <div className="bg-white overflow-hidden shadow-xl rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    description
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Consultation Fee
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hospital
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="px-4 py-2 whitespace-wrap break-words text-sm font-medium text-gray-900">
                      {doctor.name}
                    </td>
                    <td className="px-4 py-2 whitespace-wrap break-words text-sm text-gray-500">
                      {doctor.description}
                    </td>
                    <td className="px-4 py-2 whitespace-wrap break-words text-sm text-gray-500">
                      $
                      {doctor.consultation_fee}
                    </td>
                    <td className="px-4 py-2 whitespace-wrap break-words text-sm text-gray-500">
                      {doctor.hospital}
                    </td>
                    <td className="px-4 py-2 whitespace-wrap text-right text-sm font-medium">
                      <DeleteDoctor id={doctor.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDoctorPage;
