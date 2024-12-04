const AccountInfo = ({accountInfo}: any) => {
    return (
        <section>
        <h2 className="text-lg font-bold mb-4">Account Info</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Ad Account Name</p>
            <p className="text-2xl font-bold">{accountInfo?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Available Balance</p>
            <p className="text-2xl font-bold">${accountInfo?.balance || '0.00'} {accountInfo?.currency || 'USD'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Today's Spend</p>
            <p className="text-2xl font-bold">${accountInfo?.todaySpend || '0.00'} {accountInfo?.currency || 'USD'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lifetime Spend</p>
            <p className="text-2xl font-bold">${Number(accountInfo?.lifetimeSpend).toLocaleString() || '0.00'} {accountInfo?.currency || 'USD'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Spend Cap</p>
            <p className="text-2xl font-bold">{accountInfo?.spendCap ? `$${accountInfo?.spendCap}` : 'No Limit'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Account Status</p>
            <p className={`text-2xl font-bold ${accountInfo?.accountStatus === 1 ? 'text-green-500' : 'text-red-500'}`}>
              {accountInfo?.accountStatus === 1 ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Campaigns</p>
            <p className="text-2xl font-bold">{accountInfo?.totalCampaigns}</p>
          </div>
        </div>
        <a href="/billing" className="block mt-4 text-center text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-800 rounded-md px-4 py-2">View details →</a>
        </section>
    )
}
export default AccountInfo;