'use client';

const AccountInfo = ({accountInfo}: any) => {
    return (
        <section>
        <h2 className="text-lg font-bold mb-4 text-[#fbfbe9]">Account Info</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-[#fbfbe9]">Ad Account Name</p>
            <p className="text-2xl font-bold text-[#fbfbe9]">{accountInfo?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-[#fbfbe9]">Available Balance</p>
            <p className="text-2xl font-bold text-[#fbfbe9]">${accountInfo?.balance || '0.00'} {accountInfo?.currency || 'USD'}</p>
          </div>
          <div>
            <p className="text-sm text-[#fbfbe9]">Today's Spend</p>
            <p className="text-2xl font-bold text-[#fbfbe9]">${accountInfo?.todaySpend || '0.00'} {accountInfo?.currency || 'USD'}</p>
          </div>
          <div>
            <p className="text-sm text-[#fbfbe9]">Lifetime Spend</p>
            <p className="text-2xl font-bold text-[#fbfbe9]">${Number(accountInfo?.lifetimeSpend).toLocaleString() || '0.00'} {accountInfo?.currency || 'USD'}</p>
          </div>
          <div>
            <p className="text-sm text-[#fbfbe9]">Spend Cap</p>
            <p className="text-2xl font-bold text-[#fbfbe9]">{accountInfo?.spendCap ? `$${accountInfo?.spendCap}` : 'No Limit'}</p>
          </div>
          <div>
            <p className="text-sm text-[#fbfbe9]">Account Status</p>
            <p className={`text-2xl font-bold text-[#fbfbe9] ${accountInfo?.accountStatus === 1 ? 'text-green-500' : 'text-red-500'}`}>
              {accountInfo?.accountStatus === 1 ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#fbfbe9]">Total Campaigns</p>
            <p className="text-2xl font-bold text-[#fbfbe9]">{accountInfo?.totalCampaigns}</p>
          </div>
        </div>
        <a href="/billing" className="block mt-4 text-center text-sm font-medium text-[#ededd2] bg-[#dfbf7f] hover:bg-[#b6985c] rounded-md px-4 py-2">View details →</a>
        </section>
    )
}
export default AccountInfo;