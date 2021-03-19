pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        // approvers.push(msg.sender); // it is not a array now
        approvers[msg.sender] = true;
        approversCount++;
    }
      
    function createRequest(string description, uint value, address recipient) 
    public restricted {
        Request memory    newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        }); 
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager

        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
    
} 

// poor approach for voting system 
// contract Campaign { 
//     function approveRequest(Request request) public {
//         // Make sure person calling this function has donated 
//         bool isApprover = false;
//         for (uint i = 0; i< approvers.length; i++) {
//             if (approvers[i] == msg.sender) {
//                 isApprover = true;
//             }
//         }
//         require(isApprover);
        
//         // Make sure person calling this function hasn't voted before
//         for (uint i = 0; i < request.approvers.length; i++) {
//             require(request.approvers[i] != msg.sender);
//         }
//     }
// }