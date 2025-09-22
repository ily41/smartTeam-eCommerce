import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, Save, X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAddFilterMutation, useGetFiltersQuery } from '../../../store/API';
import { toast } from 'react-toastify';

// Fixed FilterUi component
// Main fixes implemented:
// 1) options state was being treated inconsistently (sometimes set to an object). Now options is always an array.
// 2) newOption updates were wrongly calling setOptions — fixed to setNewOption.
// 3) addOption / removeOption / toggleOptionStatus now update the options array properly.
// 4) openModal syncs options state when editing a filter.
// 5) submit bundles options into payload when calling addFilter.

const FilterUi = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [loading, setLoading] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});

  const { data: filters, isLoading: isFilterDataLoading, refetch } = useGetFiltersQuery();
  const [addFilter] = useAddFilterMutation();

  // options is always an array
  const [options, setOptions] = useState([]);

  // central form state
  const [formData, setFormData] = useState({
    name: '',
    type: 0,
    isActive: true,
    sortOrder: 0,
    options: []
  });

  const [newOption, setNewOption] = useState({
    value: '',
    displayName: '',
    color: 'red',
    iconUrl: '',
    isActive: true,
    sortOrder: 0
  });

  const toggleExpanded = (filterId) => {
    setExpandedFilters(prev => ({ ...prev, [filterId]: !prev[filterId] }));
  };

  const openModal = (mode, filter = null) => {
    setModalMode(mode);

    if (filter) {
      // sync both formData and options state from the filter we received
      setFormData({
        name: filter.name ?? '',
        type: filter.type ?? 0,
        value: filter.value ?? "",
        isActive: filter.isActive ?? true,
        sortOrder: filter.sortOrder ?? 0,
        options: Array.isArray(filter.options) ? [...filter.options] : []
      });
      setOptions(Array.isArray(filter.options) ? [...filter.options] : []);
      setSelectedFilter(filter);
    } else {
      // new filter
      setFormData({ name: '', value:"", type: 'checkbox', isActive: true, displayOrder: 0, options: [] });
      setOptions([]);
      setSelectedFilter(null);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFilter(null);
    setNewOption({ value: '', displayName: '', color: 'red', iconUrl: '', isActive: true, sortOrder: 0 });
    setOptions([]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const parsed = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);
    setFormData(prev => ({ ...prev, [name]: parsed })); 
  };

  const addOption = () => {
    if (!newOption.displayName || !newOption.value) return;

    const opt = { ...newOption, id: Date.now() };
    setOptions(prev => [...prev, opt]);

    // clear newOption inputs
    setNewOption({ value: '', displayName: '', color: 'red', iconUrl: '', isActive: true, sortOrder: 0 });
  };

  const removeOption = (optionId) => {
    setOptions(prev => prev.filter(opt => opt.id !== optionId));
  };

  const toggleOptionStatus = (optionId) => {
    setOptions(prev => prev.map(opt => opt.id === optionId ? { ...opt, isActive: !opt.isActive } : opt));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        
        console.log(formData)
        console.log(options)
      const payload = { ...formData, options };
      // If your API has separate add / update endpoints, use the correct mutation here.
      // For demo we use addFilter for both (adjust for your real API).
    //   const result = await addFilter(payload).unwrap?.();
      const resultE = await addFilter({
          name: formData.name,           
          type: formData.type,
          isActive: formData.isActive,
          sortOrder: formData.sortOrder ?? 0,
          options: options,
          slug: "somethignNEw"
        }).unwrap?.();
        console.log(resultE)
      toast.success("Filter added successfully!")
      refetch()
    } catch (err) {
      console.error('submit error', err);
    }
    setLoading(false);
    closeModal();
  };

  const deleteFilter = (filterId) => {
    if (window.confirm('Are you sure you want to delete this filter?')) {
      // implement delete API call
    }
  };

  const toggleFilterStatus = (filterId) => {
    // implement toggle via API
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Filter Management</h1>
            <p className="text-gray-400 mt-1">Manage product filters and their options</p>
          </div>
          <button
            onClick={() => openModal('add')}
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg transform hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Filter
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="divide-y divide-gray-700">
            {isFilterDataLoading ? (
              <div className="p-6 flex justify-center"><Loader2 className="w-12 h-12 animate-spin text-indigo-500" /></div>
            ) : (
              filters?.map((filter) => (
                <div key={filter.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleExpanded(filter.id)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        {expandedFilters[filter.id] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-semibold text-white">{filter.name}</h3>
                          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${filter.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{filter.isActive ? 'Active' : 'Inactive'}</span>
                          <span className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full font-medium">{filter.typeName ?? filter.type}</span>
                        </div>
                        <p className="text-gray-400">/{filter.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleFilterStatus(filter.id)}
                        className={`p-3 rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200 ${filter.isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                        title={filter.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {filter.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => openModal('edit', filter)} className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteFilter(filter.id)} className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transform hover:scale-110 transition-all duration-200" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {expandedFilters[filter.id] && Array.isArray(filter.options) && filter.options.length > 0 && (
                    <div className="mt-6 ml-12">
                      <h4 className="font-semibold text-white mb-4 text-lg">Options ({filter.options.length})</h4>
                      <div className="space-y-3">
                        {filter.options.map((option) => (
                          <div key={option.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                            <div>
                              <span className="font-medium text-white text-lg">{option.displayName ?? option.label}</span>
                              <span className="text-gray-400 ml-3">({option.value})</span>
                            </div>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${option.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{option.isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{modalMode === 'add' ? 'Add New Filter' : modalMode === 'edit' ? 'Edit Filter' : 'Filter Details'}</h2>
                  <button onClick={closeModal} className="p-2 hover:bg-gray-700 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Filter Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} disabled={modalMode === 'view'} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-600" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                      <input type="text" name="value" value={formData.value} onChange={handleInputChange} disabled={modalMode === 'view'} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
                      <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleInputChange} disabled={modalMode === 'view'} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus: focus:border-transparent disabled:bg-gray-600" min="0" />
                    </div>
                    <div className="flex items-center justify-center">
                      <label className="flex items-center mt-6">
                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} disabled={modalMode === 'view'} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded  focus:ring-2" />
                        <span className="ml-2 text-sm font-medium text-gray-300">Active</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">Options</label>

                    {modalMode !== 'view' && (
                      <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="Option label" value={newOption.displayName} onChange={(e) => setNewOption(prev => ({ ...prev, displayName: e.target.value }))} className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        <input type="text" placeholder="Option value" value={newOption.value} onChange={(e) => setNewOption(prev => ({ ...prev, value: e.target.value }))} className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        <button type="button" onClick={addOption} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">Add</button>
                      </div>
                    )}

                    <div className="space-y-3">
                      {options.map((option) => (
                        <div key={option.id} className="flex items-center justify-between p-4 border border-gray-600 bg-gray-700 rounded-lg">
                          <div>
                            <span className="font-medium text-white">{option.displayName}</span>
                            <span className="text-gray-400 ml-2">({option.value})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {modalMode !== 'view' && (
                              <>
                                <button type="button" onClick={() => toggleOptionStatus(option.id)} className={`px-3 py-1 text-sm font-semibold rounded-full ${option.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{option.isActive ? 'Active' : 'Inactive'}</button>
                                <button type="button" onClick={() => removeOption(option.id)} className="text-red-400 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </>
                            )}
                            {modalMode === 'view' && (
                              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${option.isActive ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{option.isActive ? 'Active' : 'Inactive'}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {modalMode !== 'view' && (
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-600">
                      <button type="button" onClick={closeModal} className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors">Cancel</button>
                      <button type="button" onClick={handleSubmit} disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 font-semibold transition-colors">
                        {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                        <Save className="w-4 h-4" />
                        {modalMode === 'add' ? 'Create Filter' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterUi;
