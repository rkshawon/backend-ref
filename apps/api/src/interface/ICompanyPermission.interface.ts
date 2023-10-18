interface IAccess {
    access: boolean;
}

interface ICompanyPermission {
    dashboard?: IAccess
    marketplace?: IAccess
    inventory?: IAccess
    orders?: IAccess
    transports?: IAccess
    auctions?: IAccess
    transaction?: IAccess
    events?: IAccess
    settings?: IAccess
    users?: IAccess
}


export default ICompanyPermission;