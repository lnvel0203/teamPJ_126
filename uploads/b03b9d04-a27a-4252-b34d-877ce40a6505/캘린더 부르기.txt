import axios from 'axios';

const id = localStorage.getItem('id');
const API_BASE_URL = 'http://localhost:8081/members';


export const datatrans=()=>{
  const newevent = {
      id:id,
      startDate : "20030405",
      endDate : "20030407",
      title: "title",
      descriptions: "descriptions",
      color: "color"
    };

    axios.post(API_BASE_URL + "/insert", newevent);

}


export const dataSchedule=()=>{


axios.get(API_BASE_URL+"/calender/getcontent" + "/" +id)
.then((response) =>{
  console.log(response.data);

  alert(response.data);

  window.open("/test", "Add Event", "width=500,height=400");
})
.catch(error =>{
console.error(error);

});


}

