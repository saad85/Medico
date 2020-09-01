import Link from 'next/link';

const filterOptions =(props) => (

  <div>
    <div className="filter-options">
      <span className="filter-options-text">Cardiology</span>
    </div>

      <style jsx>{`
          a{
            font-family: 'Oswald', sans-serif;
            color:#127ba3!important;
          }

          .filter-options{
            margin: 5px;
            padding:5px;
            text-align: center;
            max-width: 125px;
            min-height: 12px;
            border: 2px solid #127ba3;
            border-radius:30px;
            min-width: 125px;
          }

          .filter-options-text{
            font-family: 'Oswald', sans-serif;
            color:#127ba3!important;
          }

        `}</style>

    </div>

);

export default filterOptions;
