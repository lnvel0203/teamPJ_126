import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { request } from '../../utils/axios';
function Calendar() {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);

  const id = localStorage.getItem('id');

  // - 캘린더 일정 목록 - REST API -백단연결
  useEffect(() => {
    const fetchCalendars = async () => {
      request('GET', '/calender/getCalender/' + id).then((response) => {
        setCalendars(response.data);
      });
    };

    fetchCalendars();
  }, []);

  useEffect(() => {
    const calendarEvents = calendars.map((calendar) => ({
      userid: calendar.no,
      userids: calendar.id,
      start: calendar.startDate,
      end: calendar.endDate,
      title: calendar.title,
      description: calendar.descriptions,
      color: calendar.color
    }));
    setEvents(calendarEvents);
  }, [calendars, setEvents]);

  const handleDateSelect = (selectInfo) => {
    const formHtml = `
      <html>
      <head>
        <style>
          #newEventForm {
            margin: 0 auto;
            max-width: 600px;
            padding: 20px;
            border: 2px solid #ccc;
            border-radius: 10px;
          }
    
          label {
            font-weight: bold;
          }
    
          input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
    
          input[type="checkbox"] {
            margin-right: 5px;
          }
    
          input[type="submit"] {
            background-color: #008000;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
    
          input[type="submit"]:hover {
            background-color: #006400;
          }
    
          #cancelButton {
            background-color: #ccc;
            color: #000;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
    
          #cancelButton:hover {
            background-color: #999;
          }
        </style>
      </head>
      <body>
      <form id="newEventForm">
      <label for="title">등록</label><br>
      <input type="text" id="title" name="title"><br>
      <label for="description">내용</label><br>
      <input type="text" id="description" name="description"><br>
      <label for="color">색상</label><br>
      <input type="radio" id="green" name="color" value="#CE8467" checked>
      <label for="#CE8467">갈색</label><br>
      <input type="radio" id="blue" name="color" value="#E4A99B">
      <label for="#E4A99B">살색</label><br>
      <input type="radio" id="red" name="color" value="#838BB2">
      <label for="#838BB2">보라색</label><br>
      <input type="radio" id="yellow" name="color" value="#CACFE3">
      <label for="#CACFE3">연보라색</label><br><br>
      <input type="submit" value="등록">
      <button id="cancelButton">취소</button>
    </form>
      </body>
    </html>
    `;

    const newWindow = window.open('', 'Add Event', 'width=500,height=400');
    newWindow.document.body.innerHTML = formHtml;

    newWindow.document.getElementById('newEventForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const title = newWindow.document.getElementById('title').value;
      const descriptions = newWindow.document.getElementById('description').value;
      const selectedColor = newWindow.document.querySelectorAll('input[name="color"]:checked');
      const color = Array.from(selectedColor).map((checkbox) => checkbox.value)[0];
      const startDate = selectInfo.startStr;
      const endDate = selectInfo.endStr;

      console.log(title);
      console.log(descriptions);
      console.log(selectInfo.startStr);
      console.log(selectInfo.endStr);
      console.log(color);

      const newevent = {
        id: id,
        startDate: startDate,
        endDate: endDate,
        title: title,
        descriptions: descriptions,
        color: color
      };

      console.log('insert 호출!!', newevent);

      // - 캘린더 일정 입력 - REST API -백단연결
      request('POST', '/calender/insert/', {
        id: id,
        startDate: startDate,
        endDate: endDate,
        title: title,
        descriptions: descriptions,
        color: color
      })
        .then((response) => {
          console.log(response.data);
          alert('일정이 추가되었습니다.');
          newWindow.close();
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          alert('일정 추가에 실패했습니다.');
          newWindow.close();
        });
    });

    newWindow.document.getElementById('cancelButton').addEventListener('click', (event) => {
      event.preventDefault();
      newWindow.close();
    });
  };

  const handleEventClick = (clickInfo) => {
    const eventEl = clickInfo.el;

    eventEl.querySelectorAll('.delete-button').forEach((btn) => {
      btn.remove();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '삭제';
    deleteBtn.classList.add('delete-button');
    deleteBtn.onclick = () => {
      if (window.confirm(`삭제 합니다.'${clickInfo.event.title}'?`)) {
        const deletes = clickInfo.event.title;
        console.log('deletes 호출!!', deletes);

        // - 캘린더 일정 삭제 - REST API -백단연결
        request('DELETE', '/calender/delete/' + deletes);
        clickInfo.event.remove();
        window.location.reload();
      }
    };
    eventEl.appendChild(deleteBtn);
  };
  const eventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <p>
          <h3>{eventInfo.event.title}</h3>
        </p>
        <p>{eventInfo.event.extendedProps.description}</p>
      </>
    );
  };
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={handleEventClick}
        eventContent={eventContent}
        select={(info) => handleDateSelect(info)}
        eventRemove={(info) => {
          setEvents(events.filter((event) => event !== info.event));
        }}
      />
    </div>
  );
}

export default Calendar;
