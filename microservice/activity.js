import {writeFileSync, readFileSync} from 'fs';
import { ApplicationFailure } from '@temporalio/workflow';

export function getMenuItems(){
    try {
        var data = readFileSync('menuItems.json',);
        return JSON.parse(data);
    }
    catch(err){
        throw ApplicationFailure.create({
            nonRetryable: true,
            message: "Cannot read file"
          });
    }

} 
export async function addOrder(name,quantity){
    try {
        var data = JSON.parse(readFileSync('./menuItems.json'));
        const index = data.findIndex((obj) => { if(obj.name === name) return true; });
        data[index].quantity = data[index].quantity - quantity;
        writeFileSync('./menuItems.json',JSON.stringify(data));

        var placedOrders = JSON.parse(readFileSync('./orders.json'));
        placedOrders.push({"name":name, "quantity": quantity});
        writeFileSync('./orders.json',JSON.stringify(placedOrders));
        return true;
    }
    catch(err){
        console.log(err)
        throw ApplicationFailure.create({
            nonRetryable: true,
            message: req.query.type === "device" ? "DEVICE-NOT-PAIRED" : "AUTH-UNAUTHORIZED"
          });
    }
}