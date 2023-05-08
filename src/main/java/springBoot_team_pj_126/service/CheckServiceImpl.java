package springBoot_team_pj_126.service;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.CheckMapper;
import springBoot_team_pj_126.dto.CheckDTO;
import springBoot_team_pj_126.dto.CheckOption;

@Service
public class CheckServiceImpl implements CheckService {

	@Autowired
	private CheckMapper mapper;
	
	// ========================================================
	// 현재 상태 확인
	@Override
	public int checkOutStatus(String id) {
	    System.out.println("CheckServiceImpl - checkOutStatus()");
	    
	    CheckDTO dto = mapper.attendanceList(id);

	    // checkOutStatus 메소드를 호출하여 가장 마지막에 오는 변수가 goOut 변수인지 확인
	     int selectCnt = compareStatus(dto);

	    return selectCnt;
	}
	
	// 가장 마지막에 오는 옵션
	public static int compareStatus(CheckDTO dto) {
		System.out.println("CheckServiceImpl - compareStatus()");
		
	    Timestamp latestStatus = null;
	    
	    Timestamp goOut = dto.getGoOut();

	    // DTO에 포함된 모든 Timestamp 변수 추가
	    Timestamp[] timestamps = {
	        dto.getStartWork(),
	        dto.getMetting(),
	        dto.getGoOut(),
	        dto.getFieldWork(),
	        dto.getEndWork(),
	        dto.getEducation(),
	        dto.getBusinessTrip(),
	        dto.getRest(),
	        dto.getReturnWork(),
	        dto.getAttendanceDate()
	    };

	    for (Timestamp timestamp : timestamps) {
	        if (timestamp != null) {
	            if (latestStatus == null || timestamp.after(latestStatus)) {
	                latestStatus = timestamp;
	            }
	        }
	    }

	    // 가장 마지막에 오는 변수가 goOut 변수이면 1을 반환, 그렇지 않으면 0을 반환
	    if (latestStatus.equals(goOut)) {
	        return 1;
	    } else {
	        return 0;
	    }
	}
	
	// 출근 여부 확인
	@Override
	public int isStartWork(String id) {
		System.out.println("CheckServiceImpl - isStartWork()");
		
		Timestamp isStartWork = mapper.isStartWork(id);
		
		int selectCnt = 0;
		if(isStartWork != null) {
			selectCnt = 1;
		}
		
		return selectCnt;
	}
	
	// 퇴근 여부 확인
	@Override
	public int isEndWork(String id) {
		System.out.println("CheckServiceImpl - isEndWork()");
		int selectCnt = 0;
		
		Timestamp isEndWork = mapper.isEndWork(id);
		if(isEndWork != null) {
			selectCnt = 1;
		}
		
		return selectCnt;
	}
	
	// 근무 현황
	@Override
	public CheckOption attendanceList(String id) {
	    System.out.println("CheckServiceImpl - attendanceList()");
	    
	    CheckDTO dto = mapper.attendanceList(id);

	    CheckOption option = new CheckOption();
	    
	    if (dto != null) {
	        if (dto.getStartWork() != null) {
	            option.setStartWork(dto.getStartWork().toString());
	        }
	        if (dto.getMetting() != null) {
	            option.setMeeting(dto.getMetting().toString());
	        }
	        if (dto.getGoOut() != null) {
	            option.setGoOut(dto.getGoOut().toString());
	        }
	        if (dto.getFieldWork() != null) {
	            option.setFieldWork(dto.getFieldWork().toString());
	        }
	        if (dto.getEndWork() != null) {
	            option.setEndWork(dto.getEndWork().toString());
	        }
	        if (dto.getEducation() != null) {
	            option.setEducation(dto.getEducation().toString());
	        }
	        if (dto.getBusinessTrip() != null) {
	            option.setBusinessTrip(dto.getBusinessTrip().toString());
	        }
	        if (dto.getRest() != null) {
	            option.setRest(dto.getRest().toString());
	        }
	        if (dto.getReturnWork() != null) {
	            option.setReturnWork(dto.getReturnWork().toString());
	        }
	    }

	    return option;
	}
	
	// 근무 체크 메서드
	@Override
	public void attendenceCheck(String id, String status){
		System.out.println("status: " + status);
		
	    // switch-case : 근무 체크 버튼 선택 판별
	    switch (status) {
	        case "start-work":	// 출근 
	        	mapper.startWork(id);
	            break;
	        case "meeting":		// 회의 
	        	mapper.meeting(id);
	            break;
	        case "go-out":		// 외출
	        	mapper.goOut(id);
	            break;
	        case "field-work":	// 외근
	        	mapper.fieldWork(id);
	        	break;
	        case "end-work":	// 퇴근	
	        	mapper.endWork(id);
	            break;
	        case "education":	// 교육
	        	mapper.education(id);
	            break;
	        case "business-trip":// 출장
	        	mapper.businessTrip(id);
	            break;
	        case "rest":		// 휴식
	        	System.out.println("휴식?");
	        	mapper.rest(id);
	        	break;
	        case "return-work":	// 복귀
	        	System.out.println("복귀?");
	        	mapper.returnWork(id);
	            break;
	        default:
	            System.out.println("알수없는 요청");
	    }
	    
	}
	
	// ========================================================
	// 근무 시간
	@Override
	public Map<String, Object> getDate(String id) {
		Map<String, Object> data = new HashMap<>();
		
		int totalDays = mapper.totalDays(id);
		int totalHours = mapper.totalHours(id);
		
		data.put("totalHours", totalHours);
		data.put("totalDays", totalDays);
		
		return data;
	}

	// 근태 현황
	@Override
	public Map<String, Object> getAttendance(String id) {
		Map<String, Object> data = new HashMap<>();
  
		// #TODO - 결근 어떻게 처리할지 고민해보기
		int tardy = mapper.tardy(id);
		int absenteeism = 0;
		int earlyDeparture = mapper.earlyDeparture(id);
		int unchecked = mapper.unchecked(id);
  
		data.put("tardy", tardy);
		data.put("absenteeism", absenteeism);
		data.put("earlyDeparture", earlyDeparture);
		data.put("unchecked", unchecked);
		
		return data;
	}

}
