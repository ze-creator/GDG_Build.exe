import React from 'react';
import { Droplet, Clock, MapPin, Phone, Info, X, Check, AlertTriangle, CheckCircle } from 'lucide-react';
import { DonationListingData } from './DonationListingForm';

interface DonationsListProps {
  donations: DonationListingData[];
  userType: 'donor' | 'recipient';
  onStatusChange: (donationId: string, newStatus: 'available' | 'pending' | 'completed') => void;
  onRequestDonation: (donationId: string) => void;
  onAcceptRequest: (donationId: string, recipientId: string) => void;
  onRejectRequest: (donationId: string, recipientId: string) => void; // Add this new prop
  currentUser?: { uid: string } | null;
}
const DonationsList: React.FC<DonationsListProps> = ({
  donations,
  userType,
  onStatusChange,
  onRequestDonation,
  onAcceptRequest,
  onRejectRequest,
  currentUser: user
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {donations.map((donation) => (
        <div 
          key={donation.id} 
          className={`p-4 rounded-lg border ${
            donation.status === 'completed' 
              ? 'bg-green-50 border-green-200' 
              : donation.status === 'pending'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-white border-red-100'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Droplet className="text-[#DC2626] h-5 w-5 mr-2" />
                <h4 className="font-semibold text-gray-900">{donation.bloodType} Blood Donation</h4>
                <div className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                  donation.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : donation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                }`}>
                  {donation.status === 'completed' 
                    ? 'Completed'
                    : donation.status === 'pending'
                      ? 'Pending Approval' 
                      : 'Available'}
                </div>
              </div>
              
              <div className="text-sm flex flex-wrap gap-y-1 gap-x-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{donation.contactNumber}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{donation.availability}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{donation.location}</span>
                </div>
              </div>
              
              {donation.additionalInfo && (
                <div className="mt-2 text-sm text-gray-600 flex items-start">
                  <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                  <p>{donation.additionalInfo}</p>
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500">
                {donation.status === 'pending' && userType === 'donor' ? (
                  <p>Request from: {donation.recipientName || 'Unknown Recipient'}</p>
                ) : (
                  <p>Listed on: {donation.listedOn}</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-end">
              {userType === 'donor' ? (
                // Donor actions
                donation.status === 'pending' ? (
                  // Pending request actions for donor
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => onAcceptRequest(donation.id, donation.requesterId)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm inline-flex items-center"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </button>
                    <button
                      onClick={() => onRejectRequest(donation.id, donation.requesterId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm inline-flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                  </div>
                ) : donation.status === 'completed' ? (
                  // Completed donation for donor - no actions needed
                  <div className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                ) : (
                  // Available donation for donor - mark as complete option
                  <button
                    onClick={() => onStatusChange(donation.id, 'completed')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm inline-flex items-center"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Complete
                  </button>
                )
              ) : (
                // Recipient actions
                donation.status === 'available' ? (
                  // Available donation for recipient - request option
                  <button
                    onClick={() => onRequestDonation(donation.id)}
                    className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-3 py-1 rounded-md text-sm inline-flex items-center"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Request
                  </button>
                ) : donation.status === 'pending' && donation.requesterId === user?.uid ? (
                  // Pending donation requested by this recipient - cancel option
                  <button
                    onClick={() => onStatusChange(donation.id, 'available')}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm inline-flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel Request
                  </button>
                ) : donation.status === 'completed' ? (
                  // Completed donation for recipient - no actions
                  <div className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                ) : (
                  // Other status for recipient
                  <div className="text-yellow-400 text-sm flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Not Available
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationsList;