
const adminPermission = {
  dashboard: {
    access: true,
  },
  marketplace: {
    access: true,
  },
  inventory: {
    access: true,
  },
  orders: {
    access: true,
  },
  transports: {
    access: true,
  },
  auctions: {
    access: true,
  },
  settings: {
    access: true,
  },
  transaction: {
    access: true,
  },
  users: {
    access: true,
  },
  events: {
    access: true,
  }
};

const memberPermission = {
  dashboard: {
    access: true,
  },
  marketplace: {
    access: true,
  },
  inventory: {
    access: true,
  },
  orders: {
    access: true,
  },
  transports: {
    access: true,
  },
  auctions: {
    access: true,
  },
  settings: {
    access: false,
  },
  transaction: {
    access: true,
  },
  users: {
    access: false,
  },
  events: {
    access: true,
  }
};

const driverPermission = {
  dashboard: {
    access: true,
  },
  trips:{
    access: true
  }
 
};

export {
    adminPermission,
    memberPermission,
    driverPermission
}
