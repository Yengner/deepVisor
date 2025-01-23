import { getLoggedInUser } from '@/lib/actions/user.actions';
import PlatformAdAccountDropdown from './PlatformAdAccountDropdown';

export default async function Topbar() {
  const loggedInUser = await getLoggedInUser();

  return (
    <div className="w-full h-16 bg-white px-6 border-b border-gray-300 flex items-center justify-between z-50">
      {/* Left Section: Breadcrumb and Search */}
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/images/logo/deepvisor.ico"
            alt="Analytics Logo"
            className="w-7 h-7"
          />
          <span className="text-gray-700 font-semibold text-lg">Analytics</span>
        </div>

        {/* Platform and Ad Account Selector */}
        <PlatformAdAccountDropdown loggedInUser={loggedInUser} />
      </div>

      {/* Right Section: Action Icons */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Try searching 'link with Ads'"
          className="w-96 px-4 py-2 text-sm border border-gray-200 rounded-md focus:ring focus:ring-blue-300"
        />
        <button className="text-gray-600 hover:text-blue-500">
          <img
            src="/images/profile-pic.png" // Replace with your profile image
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </button>
      </div>
    </div>
  );
};
