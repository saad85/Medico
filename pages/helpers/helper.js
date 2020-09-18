
import cookies from 'js-cookie';
import useSWR from 'swr';

let helpers = {};

helpers.getCurrentUserId= function(){

  const {data,revalidate} = useSWR("api/users/me",async function(arg){

    const res = await fetch(arg);
    return res.json();
  });

    return data && data.userId ? data.userId : null ;
}

export default function CommonHelpers(){

  return helpers;

};