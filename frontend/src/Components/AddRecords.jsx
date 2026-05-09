
import { useState } from 'react'
import useAuthStore from '../Stores/AuthStore'

const AddRecords = ({ isOpen, onClose }) => {
  const { AddRecords } = useAuthStore()
  const [formData, setFormData] = useState({
    caseNo: '',
    court: '',
    petitioners: '',
    hearingDate: '',
    District:''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)
    AddRecords(formData.caseNo, formData.court, formData.petitioners, formData.hearingDate, formData.district)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Add New Record</h2>
          <button className="text-gray-500 hover:text-gray-900 text-3xl hover:bg-gray-100 rounded p-1 transition" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Case No */}
          <div className="flex flex-col gap-2">
            <label htmlFor="caseNo" className="text-sm font-medium text-gray-700">Case No</label>
            <input
              type="text"
              id="caseNo"
              name="caseNo"
              value={formData.caseNo}
              onChange={handleInputChange}
              placeholder="Enter case number"
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Court */}
          <div className="flex flex-col gap-2">
            <label htmlFor="court" className="text-sm font-medium text-gray-700">Court</label>
            <input
              type="text"
              id="court"
              name="court"
              value={formData.court}
              onChange={handleInputChange}
              placeholder="Enter court name"
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Petitioners */}
          <div className="flex flex-col gap-2">
            <label htmlFor="petitioners" className="text-sm font-medium text-gray-700">Petitioners</label>
            <input
              type="text"
              id="petitioners"
              name="petitioners"
              value={formData.petitioners}
              onChange={handleInputChange}
              placeholder="Enter petitioners name"
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Hearing Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="hearingDate" className="text-sm font-medium text-gray-700">Hearing Date</label>
            <input
              type="date"
              id="hearingDate"
              name="hearingDate"
              value={formData.hearingDate}
              onChange={handleInputChange}
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* District */}
          <div className="flex flex-col gap-2">
            <label htmlFor="district" className="text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="Enter district name"
              required
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end pt-5 border-t border-gray-200 mt-3">
            <button type="button" className="px-5 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 font-medium transition" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium transition">
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecords
