use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Uint64, Uint128, Binary};

use crate::state::ContractInfo;

#[cw_serde]
pub struct InstantiateMsg {
    pub database_address: Addr,
    pub borrower : Addr,
    pub token_uri : String,
    pub borrowed_amount : Uint64,
    pub interest : Uint64,
    pub days_before_expiration : u64,
}

#[cw_serde]
pub enum ExecuteMsg {
    AcceptPayment { payment : Uint64},
    UpdateStatus {},
    Receive { sender : String, amount : Uint128, msg : Binary }, //Implements receiver interface for CW20 Receiver
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ContractInfo)]
    GetDetails {},
    #[returns(Uint64)]
    RemainingPayment {},
}