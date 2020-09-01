import Head from 'next/head';
import Layout from '../components/Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterOptions from '../components/tools/filter-options';

export default function Home() {
  return (
    <div>
      <Layout>
          <header>

         </header>

          <div className="wrap">
            <div className="search-text"><h3>Search and get Appoinment with your deired Doctor.</h3></div>
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

      <style jsx>{`
          .search-doctor-container{
              width:100%;
              height:80vh;
              background-image:url(https://i0.wp.com/www.studentdoctor.net/wp-content/uploads/2019/03/shutterstock_582888679.png?fit=1200%2C627&ssl=1);
              background-size:cover;
              background:black;
              opacity: 0.6;
          }

          header {
            width:100%;
            height:60vh;
            background-image:linear-gradient(48deg, #527af5 0%, #39d0b5 100%) ;
            overflow: hidden;
          }

          img {
             object-fit: cover;
             opacity: 0.4;
          }

        .search {
          width: 100%;
          position: relative;
          display: flex;
          font-family: 'Mukta', sans-serif;
        }

        .search-text{
          font-family: 'Oswald', sans-serif;
          color:white!important;
          text-align: center;
          margin-bottom: 20px;
        }

        .searchTerm {
          width: 80%;
          border: 3px solid white !important;
          border-right: none;
          padding: 12px;
          height: 55px;
          border-radius: 30px 0 0 30px;
          outline: none;
          color: #9DBFAF;
          margin-left:30px;
          transition:  0.5s;
        }

        .searchTerm:focus{
          color: #00B4CC;
          width: 100%;
          margin-left:0px;
        }

        .searchButton {
          width: 50px;
          height: 55px;
          border: 1px solid white;
          background: #158CBA !important;
          text-align: center;
          color: #fff;
          border-radius: 0 30px 30px 0;
          cursor: pointer;
          font-size: 20px;
        }

        /*Resize the wrap to see the search bar change!*/
        .wrap{
          width: 40%;
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -40%);
          z-index:1000;
        }

        .options{
          text-align: -webkit-center;
          margin-top:25px;
        }

        .options-continer{
          display: inline-flex;
        }

        `}</style>

      <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>
    </div>

  )
}
