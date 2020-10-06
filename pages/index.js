
import Layout from '../components/layout';
import SearchSection from '../pages/ui/search-section/index';
import DoctrorsSection from '../pages/ui/doctors/index';
import React, { useState,useEffect } from "react";
import CustomToaster from '../components/tools/toaster/toaster'

export default function Home() {

  const [searchText, setSearchText] = useState('');
  const [isShowToaster, setIsShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(false);
  const [toasterTextClass, setToasterTextClass] = useState('');

  function searchTextChanged(value){
    setSearchText(value)
  }

  function showToaster(toasterMessage,toasterTextClass){
    setIsShowToaster(true);
    setToasterMessage(toasterMessage);
    setToasterTextClass(toasterTextClass);
  }

  if(typeof window !=='undefined') window.$showToaster = showToaster;

  return (
    <div>
      <Layout>    

        {isShowToaster ? <CustomToaster toasterMessage={toasterMessage} textClass={toasterTextClass}/>  : null}
          
          <header></header>

          <SearchSection updateparentComponent={searchTextChanged}/>

          <DoctrorsSection searchText={searchText}/>

      </Layout>
    </div>

  )}
