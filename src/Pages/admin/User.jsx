import React, { useState } from 'react';
import { FaUser, FaEdit, FaTrash, FaUserPlus, FaUsers, FaUserCheck, FaUserTimes, FaUserShield, FaStore, FaBoxes, FaCrown } from 'react-icons/fa';
import { useDeleteUserMutation, useGetMeQuery, useGetUserStaticsQuery } from '../../store/API';
import { LoaderIcon } from 'lucide-react';
import EditUserUi  from '../../components/admin/User/editUser'
import Modal from '../../components/UI/Modal'
import { toast } from 'react-toastify';


const Users = () => {
    const { data: users, error, isLoading, refetch } = useGetMeQuery();
    const { data: userStatistics, error: Serror, isLoading: SisLoading, refetch: refetchStatistics } = useGetUserStaticsQuery();
    const [deleteUser, { isDeleteLoading }] = useDeleteUserMutation();
    const [modalType, setModalType] = useState(null); 
    const [edit, setEdit] = useState(null)

    const getStatusColor = (status) => {
        switch (status) {
            case true:
                return 'text-green-400 bg-green-900/20';
            case false:
                return 'text-orange-400 bg-orange-900/20';
            default:
                return 'text-gray-400 bg-gray-900/20';
        }
    };

    const handleCloseModal = () => {
        setModalType(null);
        refetch();
        refetchStatistics();
    };

    const handleDelete = async (id) => {
        console.log(id)
     try {
      const result = await deleteUser({
          id
      }).unwrap()
        
      toast.success("User deleted succesfully")
      handleCloseModal()
        
    }catch (error){
      console.log(error)
        toast.error(error?.data || "Deleting User Failed");
        
    }
    }

    const getRoleColor = (role) => {
        switch (role) {
          case 'Admin':
            return 'text-purple-400 bg-purple-900/20'; // Bright purple for Admins (stands out)
          case 'normalUsers':
            return 'text-blue-400 bg-blue-900/20'; // Calm blue for normal users
          case 'Retail':
            return 'text-green-400 bg-green-900/20'; // Green = store/retail vibe
          case 'Wholesale':
            return 'text-yellow-400 bg-yellow-900/20'; // Yellow = bulk/big buyers
          case 'VIP':
            return 'text-pink-400 bg-pink-900/20'; // Pinkish tone for VIP (feels premium/lux)
          default:
            return 'text-gray-400 bg-gray-700/20'; // Fallback
        }

    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Users</h1>
                    <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
                </div>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2">
                    <FaUserPlus className="text-sm" />
                    Add New User
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-600 rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium">Total Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">{userStatistics?.totalUsers}</p>
                  </div>
                  <div className="text-white/60">
                    <FaUsers className="text-2xl" />
                  </div>
                </div>
              </div>
                     
                        
              <div className="bg-purple-600 rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium">Admins</h3>
                    <p className="text-3xl font-bold text-white mt-2">
                      {userStatistics?.adminUsers}
                    </p>
                  </div>
                  <div className="text-white/60">
                    <FaUserShield className="text-2xl" />
                  </div>
                </div>
              </div>
                        
              <div className="bg-blue-500 rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium">Normal Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">
                      {userStatistics?.normalUsers}
                    </p>
                  </div>
                  <div className="text-white/60">
                    <FaUser className="text-2xl" />
                  </div>
                </div>
              </div>
                        
              <div className="bg-green-500 rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium">Retail Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">
                      {userStatistics?.retailUsers}
                    </p>
                  </div>
                  <div className="text-white/60">
                    <FaStore className="text-2xl" />
                  </div>
                </div>
              </div>
                        
              <div className="bg-yellow-500 rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium">Wholesale Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">
                      {userStatistics?.wholesaleUsers}
                    </p>
                  </div>
                  <div className="text-white/60">
                    <FaBoxes className="text-2xl" />
                  </div>
                </div>
              </div>
                        
              <div className="bg-pink-600 rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white/80 text-sm font-medium">VIP Users</h3>
                    <p className="text-3xl font-bold text-white mt-2">
                      {userStatistics?.vipUsers}
                    </p>
                  </div>
                  <div className="text-white/60">
                    <FaCrown className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>

            
            <Modal open={modalType === 'edit'} setOpen={handleCloseModal}>
              {edit && <EditUserUi setOpen={handleCloseModal} edit={edit} />}
            </Modal>



            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading 
              ? <LoaderIcon />  
              : users.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors duration-200"
                  >
                    {/* Modals */}
                    
                    <div className="relative">
                      <div className="absolute top-3 left-3 z-10">
                        <span 
                          className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(item.isActive)}`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
            
                      <div className="absolute top-3 right-3 z-10 flex gap-2">
                        <button onClick={() => {setModalType("edit"), setEdit(item)}} className="p-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          <FaEdit className="text-sm" />
                        </button>
                        <button onClick={() => {handleDelete(item.id)}} className="p-2 bg-red-600 cursor-pointer text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                           {isDeleteLoading 
                                ? <LoaderIcon />  
                                :
                          <FaTrash className="text-sm" />}
                        </button>
                      </div>
                    </div>
            
                    <div className="p-6 pb-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-gray-600">
                          <img 
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{item.firstName} {item.lastName}</h3> 
                        <p className="text-gray-400 text-sm mb-3">{item.email}</p>
                        
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(item.roleName)}`}
                        >
                          {item.roleName} role
                        </span>
                      </div>
                    </div>
            
                    <div className="px-6 pb-6 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Joined:</span>
                        <span className="text-gray-300">
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Last Login:</span>
                        <span className="text-gray-300">{item.lastLogin ?? "N/A"}</span>
                      </div>
            
                      <div className="pt-3 border-t border-gray-700">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>User ID</span>
                          <span>{item.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>   
                ))
            }

                
                    
            
                


            </div>

            {/* Empty State for when there might be more users */}
            <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                    <FaUsers className="text-4xl mx-auto mb-4 opacity-50" />
                    <p>Showing 12 of 12 users</p>
                </div>
            </div>
        </div>
    );
};

export default Users;