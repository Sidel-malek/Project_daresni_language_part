
"use client";
import { Button } from "@/components/ui/button";
import { useState,useEffect } from "react";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { data } from "autoprefixer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddGroupDialog({ children }) {


  const [inputFields, setInputFields] = useState([
    { date: '' }
  ])
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
 }
 
 useEffect(() => {
  const numberOfInputs = 3;
  const initialData = Array.from({ length: numberOfInputs }, () => ({ date: '',}));
  setInputFields(initialData);
}, []);

  const [formData, setFormData] = useState({
    groupeName: "",
    dateFinInscription: "",
  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateString, name) => {
    const formattedDateString = dayjs(dateString, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    setFormData({ ...formData, [name]: formattedDateString });
  };
  const datesInSameWee=(dateArray) =>{
    if (dateArray.length === 0) {
        // If the array is empty, return false
        return false;
    }

    // Get the week number and year of the first date in the array
    const referenceDate = new Date(dateArray[0]);
    const referenceWeek = getWeekNumber(referenceDate);
    const referenceYear = referenceDate.getFullYear();

    // Check if all dates in the array have the same week number and year
    for (let i = 1; i < dateArray.length; i++) {
        const currentDate = new Date(dateArray[i]);
        const currentWeek = getWeekNumber(currentDate);
        const currentYear = currentDate.getFullYear();

        if (currentWeek !== referenceWeek || currentYear !== referenceYear) {
            // If any date has a different week number or year, return false
            return false;
        }
    }

    // If all dates have the same week number and year, return true
    return true;
}

  const getWeekNumber=(date)=> {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const elapsedDays = (date - firstDayOfYear) / millisecondsPerDay;
    return Math.ceil((elapsedDays + firstDayOfYear.getDay() + 1) / 7);
}


  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const dataList = inputFields.map((input) => input.date);
    if(datesInSameWee(dataList)){
      console.log(dataList,formData.groupeName,formData.dateFinInscription)
    }else{
      window.alert('tu doit entre des date dans la même semaine')
    }
  };

  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

  const disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cree un groupe</DialogTitle>
        </DialogHeader>
        <form className="gap-4 grid">
          <div className="space-y-2">
            <Label htmlFor="nom"> 
              Nom de groupe<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Nom de groupe" name="nom" id="nom" 
                  value={formData.groupeName}
                  onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFin">
              Date de fin d’inscription<span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              placeholder="Date de fin d’inscription"
              name="dateFin"
              id="dateFin"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{
                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
              }}
              value={formData.dateFinInscription ? dayjs(formData.dateFinInscription) : null}
              onChange={(date, dateString) => handleDateChange(date, dateString, "dateFinInscription")}
           
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateInscription">
              Date de début des cours <span className="text-red-500">*</span>
            </Label>
            {inputFields.map((input, index) => {
                  return (
                    
            <div key={index}>
            <Input
              type="date"
              placeholder="Date de début des cours "
              name="dateInscription"
              
              value={input.name}
              id="dateInscription"
              onChange={event => handleFormChange(index, event)}
            />
          </div>
            )
            
})}

</div>

          <Button className="w-full" onClick={handleSubmit}>Sauvegarder</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
