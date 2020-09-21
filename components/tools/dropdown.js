// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu

import {  Dropdown, FormControl, FormLabel,Modal } from "react-bootstrap";
import React, { useState,useEffect } from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={(e) => {e.preventDefault(); onClick(e);}}>
      {children}
     
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
          
          <FormControl autoFocus className="mx-3 my-2 w-auto" placeholder="Type to filter..." onChange={(e) => setValue(e.target.value)} value={value}/>
          
          <ul className="list-unstyled" style={{ color:"#5d5f5e !important",fontSize: "12px"}}>
            {React.Children.toArray(children).filter(
              (child) => !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  

export default function(props){

    const [selectedItem, setSelectedItem] = useState(''),
          specialityList = ["Orthopdecis"
          ,"Psychiatry",
          ,"Ocology",
          ,"Pediatrics",
          ,"Cardiolog",
          ,"Neurology",
          ,"Pathology",
          ,"Anesthesiology",
          ,"All Physicians",
          ,"Surgeons",
          ,"ENT",
          ,"Familty Medicine"];

        
          
        useEffect(() => {
          
          if(props && props.value) setSelectedItem(props.value)
          
        }, [props.value])

    function liClicked(e){

        let value = e.target && e.target.text ? e.target.text : '';
        if(value) {
            setSelectedItem(value);
            props.setParentComponent(value);
        }
    }

    return (
        <div>
            <Dropdown drop="down">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <div className="dropdown"><span>{selectedItem}</span><span className="dropdown-icon"> &#x25bc;</span></div>
                </Dropdown.Toggle>
                
                <Dropdown.Menu as={CustomMenu}>
                  {specialityList.map((speciality,index)=><Dropdown.Item key={index} onClick={(e)=>liClicked(e)}>{speciality}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
               
            <style jsx>{`
                .dropdown{
                    min-width: 50px;
                    padding: 5px;
                    border: 1px solid #d6d4d4;
                    background-color: #ffffff!important;
                    width: 175px;
                    height: 35px;
                    marfin-left: 50px!important;
                    color: #5d5f5e!important;
                    font-size: 12px;
                  }
                  .dropdown-icon{
                    float: right;
                    margin-right: 5px;
                  }
            `}</style>
            
        </div>)
}
 