import React from 'react';
import {ItemType} from '../../App';

type Props = {
    setListItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
    item: ItemType;
}

export const Item = ({ setListItems, item }:Props) => {

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

      setListItems((prevListItems) => {
      return prevListItems.map((prevItem) =>
          prevItem.text === name ? {...prevItem, completed: checked} : prevItem
      );
    });
  };

  return(
      <div>
          <input type="checkbox" id={item.text} name={item.text} checked={item.completed} onChange={handleCheckBoxChange}/>
          <label htmlFor={item.text}>{item.text}</label>
      </div>
  )
}