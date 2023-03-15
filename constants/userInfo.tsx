export let MASTERID = '';//this should be the username of the user if they log in or sign up successfully
export function setM(str: string) {
    MASTERID = str;
    console.log('id: ' + MASTERID);
}