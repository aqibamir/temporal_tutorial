import { proxyActivities} from '@temporalio/workflow';
// Importing the Activities. These ativities are called by the workflow.
const { addOrder, getMenuItems} = proxyActivities({
    startToCloseTimeout: '15 seconds',
    retry: {
      maximumAttempts: 1,
    },
    cancellationType: 'TRY_CANCEL',
  });  

export async function placeOrderWorkflow(name, quantity) {
    try {
     var listOfAvailableItems = await getMenuItems();
     if(
      
      listOfAvailableItems.find(item => {if(item.name === name && item.quantity >= quantity) return true;})) {
        var result = await addOrder(name,quantity);
        if(result)
            return "Order Successfuly placed";
        else 
          throw "activity failed";
     }  
     else {
        return "Invalid Order";
     }
    }
    catch (err) {
      throw err;
    }
  }