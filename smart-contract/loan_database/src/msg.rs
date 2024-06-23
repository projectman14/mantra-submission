use cosmwasm_schema::{cw_serde, QueryResponses};

use cosmwasm_std::{Addr, Uint64};
use crate::state::LoanContract;

#[cw_serde]
pub struct InstantiateMsg {
    pub admins : Vec<Addr>,
    pub minter : u64,
}

#[cw_serde]
pub enum ExecuteMsg {
    MintLoanContract{ borrower : Addr, token_uri : String, borrowed_amount : Uint64, interest : Uint64, days_before_expiration : u64},
    ChangeLoanContractStatus{ borrower : Addr, status_code : Uint64 }, //Can be used only by loan contract
    AddTokenAddress { address : Addr }, //Needed to add token which is mintable by the database
    ChangeMinter { minter : u64 }, //Only for testing and development purposes
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(LoanInfos)]
    GetLoans{ borrower : Addr },
}

#[cw_serde]
pub struct LoanInfos {
    pub contracts : Vec<LoanContract>,
}

#[cw_serde]
pub struct PriceResponse {
    pub price: i64,
    pub expo: i32,
    pub timestamp: u64,
}
