import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetchDoctors, deleteDoctor } from '../redux/slices/doctors';

const DeleteDoctorPage = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctors);
  const [id, setId] = useState(null);

  const deleteDoc = (iden) => {
    setId(iden);
    dispatch(deleteDoctor({ id: iden }));
  };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const { deleteSuccess, errors, ready } = useSelector((store) => store.doctors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && deleteSuccess) {
      toast.success('Doctor deleted!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'delete-success',
        transition: Slide,
      });
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (errors) {
      toast.error(errors.message || 'An error occured!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'delete-error',
        transition: Slide,
      });
    }
  }, [errors]);

  useEffect(() => {
    setLoading(!ready);
  }, [ready]);

  return (
    <div className="w-full">
      <ToastContainer />
      <h1 className="text-center mb-10 font-bold text-xl bg-[#97af0e] p-4 text-[26px]">DELETE A DOCTOR</h1>
      <div className="bg-white overflow-hidden rounded-lg">
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
                    <td className="px-4 py-4 whitespace-wrap break-words text-sm font-medium text-gray-900">
                      {doctor.name}
                    </td>
                    <td className="px-4 py-4 whitespace-wrap break-words text-sm text-gray-500">
                      {doctor.description}
                    </td>
                    <td className="px-4 py-4 whitespace-wrap break-words text-sm text-gray-500">
                      $
                      {doctor.consultation_fee}
                    </td>
                    <td className="px-4 py-4 whitespace-wrap break-words text-sm text-gray-500">
                      {doctor.hospital}
                    </td>
                    <td className="px-4 py-2 whitespace-wrap text-right text-sm font-medium">
                      <button type="button" className={`button is-danger ${loading && 'is-loading'}`} onClick={() => { deleteDoc(doctor.id); }}>
                        Delete
                      </button>
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
