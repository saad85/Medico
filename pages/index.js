import Head from 'next/head';
import Layout from '../components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterOptions from '../components/tools/filter-options';

export default function Home() {

  
  return (
    <div>
      <Layout>     
          <header>

         </header>
      
          <div className="wrap">
            <div className="search-text"><h3>Search and make Appoinment with your deired Doctor.</h3></div>
             <div className="search">
                <input type="text" className="searchTerm" placeholder="Search doctor by name"/>
                <button type="submit" className="searchButton">
                <i className="fa fa-search" aria-hidden="true"></i>
               </button>
             </div>
          </div>
          <div className="container options" >
            <div className=" options-continer">
              <FilterOptions/>
              <FilterOptions/>
              <FilterOptions/>
              <FilterOptions/>
            </div>

          </div>

      </Layout>
    </div>

  )
}
